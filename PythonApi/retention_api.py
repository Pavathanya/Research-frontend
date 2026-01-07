from flask import Blueprint, request, jsonify, Flask
from flasgger import swag_from
import os
import joblib
import pandas as pd
import numpy as np
from datetime import datetime

retention_bp = Blueprint('retention', __name__)

BASE_DIR = os.path.dirname(__file__)
# Default locations (you can override with env vars)
DEFAULT_MODEL = os.environ.get('RET_MODEL_PATH') or os.path.join(BASE_DIR, 'Models', 'employee_attrition_model.pkl')
DEFAULT_PREPROCESSOR = os.environ.get('RET_PREPROCESSOR_PATH') or os.path.join(BASE_DIR, 'Models', 'preprocessor.pkl')


def safe_load_model(path):
    if not path or not os.path.exists(path):
        return None, f"Model not found at {path}"
    try:
        m = joblib.load(path)
        return m, None
    except Exception as e:
        return None, str(e)


def safe_load_preprocessor(path):
    if not path or not os.path.exists(path):
        return None, None
    try:
        p = joblib.load(path)
        return p, None
    except Exception as e:
        return None, str(e)


MODEL = None
MODEL_ERR = None
PREPROCESSOR, PREPROC_ERR = safe_load_preprocessor(DEFAULT_PREPROCESSOR)


def ensure_model_loaded(force_reload: bool = False):
    """Load the model on first use (or when forced). Returns (model, error)."""
    global MODEL, MODEL_ERR
    if MODEL is None or force_reload:
        MODEL, MODEL_ERR = safe_load_model(DEFAULT_MODEL)
    return MODEL, MODEL_ERR


@retention_bp.route('/retention/health', methods=['GET'])
def health():
    """Health check for Retention API

    ---
    responses:
      200:
        description: health info
    """
    # try lazy load to report an accurate status
    ensure_model_loaded()
    return jsonify({
        'model_loaded': MODEL is not None,
        'model_path': DEFAULT_MODEL,
        'model_error': MODEL_ERR,
        'preprocessor_loaded': PREPROCESSOR is not None,
        'preprocessor_path': DEFAULT_PREPROCESSOR,
        'preprocessor_error': PREPROC_ERR,
        'fix_instructions': 'If model_error references sklearn private modules, run the API in a Python 3.11 environment with scikit-learn==1.2.1 or recreate the model with the current sklearn.'
    })


@retention_bp.route('/retention/predict', methods=['POST'])
@retention_bp.route('/retention/predict', methods=['POST'])
@swag_from({
    'tags': ['retention'],
    'consumes': ['application/json'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'Age': {'type': 'integer'},
                    'BusinessTravel': {'type': 'string'},
                    'JobRole': {'type': 'string'},
                    'JobLevel': {'type': 'integer'},
                    'MonthlyIncome': {'type': 'number'},
                    'OverTime': {'type': 'string'}
                },
                'required': ['Age','BusinessTravel','JobRole','JobLevel','MonthlyIncome','OverTime'],
                'example': {
                    'Age': 45,
                    'BusinessTravel': 'Travel_Rarely',
                    'JobRole': 'Research Scientist',
                    'JobLevel': 1,
                    'MonthlyIncome': 150000,
                    'OverTime': 'Yes'
                }
            },
            'description': 'JSON object of employee features required for prediction'
        }
    ],
    'responses': {200: {'description': 'prediction results'}, 400: {'description': 'bad request'}}
})
def predict():
    """Predict employee attrition. Requires a JSON object with employee features."""

    ensure_model_loaded()
    if MODEL is None:
        return jsonify({'error': 'Model not loaded', 'detail': MODEL_ERR,
                        'fix': 'See /retention/health fix_instructions or PythonApi/README.md for environment steps.'}), 500

    # Require JSON body with specific fields (no CSV uploads)
    if not request.is_json:
        return jsonify({'error': 'Content-Type must be application/json and body must be a JSON object'}), 400

    try:
        payload = request.get_json()
    except Exception as e:
        return jsonify({'error': 'Failed to parse JSON', 'detail': str(e)}), 400

    if not isinstance(payload, dict):
        return jsonify({'error': 'Expected a JSON object with employee features'}), 400

    required = ['Age','BusinessTravel','JobRole','JobLevel','MonthlyIncome','OverTime']
    missing = [k for k in required if k not in payload]
    if missing:
        return jsonify({'error': 'Missing required fields', 'missing': missing}), 400

    df = pd.DataFrame([payload])

    # apply preprocessor if available
    X = None
    if PREPROCESSOR is not None:
        try:
            X = PREPROCESSOR.transform(df)
        except Exception as e:
            return jsonify({'error': 'Preprocessing failed', 'detail': str(e)}), 400
    else:
        # fallback: numeric columns only
        X = df.select_dtypes(include=[np.number]).values
        if X.shape[1] == 0:
            return jsonify({'error': 'No numeric features and no preprocessor available'}), 400

    # predict
    try:
        # many sklearn classifiers expose predict_proba
        if hasattr(MODEL, 'predict_proba'):
            probs = MODEL.predict_proba(X)
            # take probability of the positive class if binary
            if probs.shape[1] == 2:
                prob_pos = probs[:, 1].tolist()
            else:
                prob_pos = probs.tolist()
            preds = MODEL.predict(X).tolist()
        else:
            preds = MODEL.predict(X).tolist()
            prob_pos = None
    except Exception as e:
        return jsonify({'error': 'Prediction failed', 'detail': str(e)}), 500

    out = df.copy()
    out['prediction'] = preds
    if prob_pos is not None:
        out['probability'] = prob_pos

    # save result with timestamped filename
    results_dir = os.path.join(BASE_DIR, 'Results')
    os.makedirs(results_dir, exist_ok=True)
    ts = datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')
    out_path = os.path.join(results_dir, f'retention_prediction_{ts}.csv')
    try:
        out.to_csv(out_path, index=False)
    except Exception:
        pass

    return jsonify(out.to_dict(orient='records'))


@retention_bp.route('/retention/reload', methods=['POST'])
def reload_model():
    """Force reload the retention model from disk."""
    ensure_model_loaded(force_reload=True)
    if MODEL is None:
        return jsonify({'loaded': False, 'error': MODEL_ERR}), 500
    return jsonify({'loaded': True, 'model_path': DEFAULT_MODEL})


def register_retention(app: Flask):
    """Register the retention blueprint on an existing Flask app."""
    app.register_blueprint(retention_bp)


if __name__ == '__main__':
    # allow running retention API standalone for debugging
    app = Flask(__name__)
    from flasgger import Swagger
    Swagger(app)
    register_retention(app)
    app.run(host='0.0.0.0', port=5010, debug=True)
