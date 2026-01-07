from flask import Flask, request, jsonify
from flasgger import Swagger, swag_from
import os
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)
Swagger(app)

# register retention blueprint (from retention_api.py)
try:
    from retention_api import register_retention
    register_retention(app)
except Exception:
    # if import fails, continue — retention endpoints won't be available
    pass

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "Models", "advanced_feedback_model.h5")
DATASET_PATH = os.path.join(BASE_DIR, "Dataset", "DataSet_New.csv")


def find_preprocessor(base_dir=BASE_DIR):
    # look for any .pkl in the PythonApi folder or Models folder
    for root, _, files in os.walk(base_dir):
        for f in files:
            if f.endswith('.pkl'):
                return os.path.join(root, f)
    return None


def safe_load_model(path):
    if not os.path.exists(path):
        return None, f"Model file not found at {path}"
    try:
        # import here so TensorFlow is not required to start the server
        try:
            from tensorflow.keras.models import load_model as _load_model
        except Exception as ie:
            return None, f"TensorFlow import failed: {ie}"
        m = _load_model(path)
        return m, None
    except Exception as e:
        return None, str(e)


def safe_load_preprocessor(path):
    if path is None:
        return None, "No preprocessor file found"
    if not os.path.exists(path):
        return None, f"Preprocessor file not found at {path}"
    try:
        p = joblib.load(path)
        return p, None
    except Exception as e:
        return None, str(e)


MODEL, MODEL_ERR = safe_load_model(MODEL_PATH)
# Prefer an explicit preprocessor stored with the model
DEFAULT_PREPROCESSOR = os.path.join(BASE_DIR, "Models", "preprocessor.pkl")
if os.path.exists(DEFAULT_PREPROCESSOR):
    PREPROCESSOR_PATH = DEFAULT_PREPROCESSOR
else:
    PREPROCESSOR_PATH = find_preprocessor()

PREPROCESSOR, PRE_ERR = safe_load_preprocessor(PREPROCESSOR_PATH)


def dataset_info(path=DATASET_PATH):
    if not os.path.exists(path):
        return None
    try:
        df = pd.read_csv(path)
        return {"rows": int(df.shape[0]), "columns": int(df.shape[1]), "columns_list": df.columns.tolist()}
    except Exception:
        return None


@app.route('/health', methods=['GET'])
def health():
        """Health check

        Returns model and preprocessor status.

        ---
        responses:
            200:
                description: Health information
                schema:
                    type: object
                    properties:
                        model_loaded:
                            type: boolean
                        preprocessor_loaded:
                            type: boolean
                        dataset:
                            type: object
        """
        info = {
                "model_loaded": MODEL is not None,
                "model_error": MODEL_ERR,
                "preprocessor_loaded": PREPROCESSOR is not None,
                "preprocessor_path": PREPROCESSOR_PATH,
                "preprocessor_error": PRE_ERR,
                "dataset": dataset_info()
        }
        return jsonify(info)


@swag_from({
    'tags': ['productivity'],
    'parameters': [
        {
            'name': 'file',
            'in': 'formData',
            'type': 'file',
            'required': False,
            'description': 'CSV file to predict on'
        }
    ],
    'responses': {
        200: {'description': 'Prediction results'},
        400: {'description': 'Bad request'},
        500: {'description': 'Server error'}
    }
})
@app.route('/productivitypredict', methods=['POST'])
def predict():
    """Make predictions (file upload only)

    Minimal, consistently-indented implementation of the prediction endpoint.
    """

    if MODEL is None:
        return jsonify({"error": "Model not loaded", "detail": MODEL_ERR}), 500

    # Accept file upload or JSON body (records)
    df = None
    if 'file' in request.files:
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        try:
            df = pd.read_csv(file)
        except Exception as e:
            return jsonify({"error": "Failed to read CSV", "detail": str(e)}), 400
    else:
        try:
            data = request.get_json()
            if data is None:
                return jsonify({"error": "No input provided"}), 400
            df = pd.DataFrame(data)
        except Exception as e:
            return jsonify({"error": "Failed to parse JSON", "detail": str(e)}), 400

    if df is None or df.shape[0] == 0:
        return jsonify({"error": "Empty input data"}), 400

    # Preprocess
    X_new = None
    if PREPROCESSOR is not None:
        try:
            X_new = PREPROCESSOR.transform(df)
        except Exception as e:
            msg = str(e)
            # attempt best-effort patch for OneHotEncoder attribute mismatches
            if "_drop_idx_after_grouping" in msg or "_drop_idx" in msg:
                try:
                    def _patch_onehots(pt):
                        patched = 0
                        try:
                            from sklearn.pipeline import Pipeline
                        except Exception:
                            return 0
                        for name, trans, cols in getattr(pt, 'transformers_', []):
                            est = trans
                            if est.__class__.__name__ == 'OneHotEncoder' and not hasattr(est, '_drop_idx_after_grouping'):
                                setattr(est, '_drop_idx_after_grouping', None)
                                patched += 1
                            else:
                                try:
                                    if isinstance(est, Pipeline):
                                        for _, step in est.steps:
                                            if step.__class__.__name__ == 'OneHotEncoder' and not hasattr(step, '_drop_idx_after_grouping'):
                                                setattr(step, '_drop_idx_after_grouping', None)
                                                patched += 1
                                except Exception:
                                    pass
                        return patched

                    patched = 0
                    if hasattr(PREPROCESSOR, 'transformers_'):
                        patched += _patch_onehots(PREPROCESSOR)
                    else:
                        try:
                            from sklearn.pipeline import Pipeline
                            if isinstance(PREPROCESSOR, Pipeline):
                                for _, step in PREPROCESSOR.steps:
                                    if hasattr(step, 'transformers_'):
                                        patched += _patch_onehots(step)
                        except Exception:
                            pass

                    if patched > 0:
                        try:
                            X_new = PREPROCESSOR.transform(df)
                        except Exception as e2:
                            return jsonify({"error": "Preprocessing failed after patch", "detail": str(e2)}), 400
                    else:
                        return jsonify({"error": "Preprocessing failed", "detail": msg}), 400
                except Exception as e_patch:
                    return jsonify({"error": "Preprocessing patch failed", "detail": str(e_patch)}), 400
            else:
                return jsonify({"error": "Preprocessing failed", "detail": msg}), 400
    else:
        try:
            X_new = df.select_dtypes(include=[np.number]).values
            if X_new.shape[0] == 0:
                return jsonify({"error": "No numeric features and no preprocessor available"}), 400
        except Exception as e:
            return jsonify({"error": "Failed to prepare features", "detail": str(e)}), 400

    # Validate feature dimensions against model input
    expected_dim = None
    try:
        if hasattr(MODEL, 'input_shape') and MODEL.input_shape is not None:
            if isinstance(MODEL.input_shape, (list, tuple)):
                expected_dim = MODEL.input_shape[-1]
            else:
                expected_dim = MODEL.input_shape
    except Exception:
        expected_dim = None

    if expected_dim is not None and getattr(X_new, 'ndim', 0) > 1:
        try:
            actual_dim = int(X_new.shape[1])
        except Exception:
            actual_dim = None
        if actual_dim is not None and actual_dim != expected_dim:
            return jsonify({
                "error": "Feature dimension mismatch",
                "detail": f"Model expects {expected_dim} features but input has {actual_dim}",
                "model_input_shape": str(MODEL.input_shape),
                "X_shape": getattr(X_new, 'shape', None),
                "input_columns": df.columns.tolist()
            }), 400

    try:
        preds = MODEL.predict(X_new)
        pred_classes = np.argmax(preds, axis=1) + 1
        df_out = df.copy()
        df_out['Predicted_Class'] = [f"{int(v)}/5" for v in pred_classes]
    except Exception as e:
        return jsonify({"error": "Prediction failed", "detail": str(e)}), 500

    # save results
    results_dir = os.path.join(BASE_DIR, 'Results')
    os.makedirs(results_dir, exist_ok=True)
    out_path = os.path.join(results_dir, 'prediction_results.csv')
    try:
        df_out.to_csv(out_path, index=False)
    except Exception:
        pass

    return jsonify(df_out.to_dict(orient='records'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
