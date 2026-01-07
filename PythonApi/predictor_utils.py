import os
import logging
from typing import Dict, Any
import joblib

logger = logging.getLogger("predictor_utils")


def predict_single_employee(model_path: str, employee: Dict[str, Any]) -> Dict[str, Any]:
    """Minimal stub for single-employee prediction.

    Tries to load a scikit-learn model via joblib if exists; otherwise returns a deterministic
    dummy prediction so the caller can be tested without the real model.
    """
    logger.debug(f"predict_single_employee called with model_path={model_path} employee={employee}")

    if model_path and os.path.exists(model_path):
        try:
            model = joblib.load(model_path)
            # Attempt to prepare features from employee dict: take numeric values only
            import numpy as np
            features = [v for v in employee.values() if isinstance(v, (int, float))]
            X = np.array(features).reshape(1, -1)
            if hasattr(model, 'predict_proba'):
                prob = model.predict_proba(X)
                # If binary, take positive class prob
                if prob.shape[1] == 2:
                    risk_score = float(prob[0, 1])
                else:
                    risk_score = float(prob[0].max())
            else:
                # fallback to predict
                p = model.predict(X)
                try:
                    risk_score = float(p[0])
                except Exception:
                    risk_score = 0.0

            return {"risk_score": risk_score, "risk_label": ("HIGH" if risk_score >= 0.5 else "LOW")}
        except ModuleNotFoundError as e:
            # Known sklearn private-module mismatch when unpickling (e.g. _gb_losses)
            logger.warning("Model unpickle failed due to missing module: %s. Returning fallback prediction.", e)
        except Exception as e:
            # Don't show full traceback for expected incompatibilities; log a short warning.
            logger.warning("Failed loading/using model (%s). Returning fallback prediction.", e)

    # Deterministic fallback using simple engineered features and mappings
    def _map_business_travel(v: Any) -> float:
        m = {
            'Travel_Rarely': 0.1,
            'Travel_Frequently': 0.2,
            'Non-Travel': 0.0
        }
        return float(m.get(str(v), 0.0))

    def _map_overtime(v: Any) -> float:
        return 0.25 if str(v).lower() in ('yes', 'y', 'true', '1') else 0.0

    def _map_jobrole(v: Any) -> float:
        # coarse grouping: technical roles slightly higher baseline risk
        tech = {'Research Scientist', 'Laboratory Technician', 'Scientist', 'Developer', 'Engineer'}
        try:
            return 0.15 if str(v) in tech else 0.05
        except Exception:
            return 0.05

    try:
        age_val = float(employee.get('Age', 40))
    except Exception:
        age_val = 40.0

    try:
        joblevel = float(employee.get('JobLevel', 1))
    except Exception:
        joblevel = 1.0

    try:
        monthly = float(employee.get('MonthlyIncome', 0))
    except Exception:
        monthly = 0.0

    bt = _map_business_travel(employee.get('BusinessTravel'))
    ot = _map_overtime(employee.get('OverTime'))
    jr = _map_jobrole(employee.get('JobRole'))

    # combine into a score in [0,1]
    # Age contributes 0..0.5, monthly income inversely contributes up to 0.2, joblevel up to 0.1, bt/ot/jr small adjustments
    age_component = max(0.0, min(0.5, (age_val - 20) / 80))
    income_component = 0.2 * (1.0 - min(1.0, monthly / 200000.0))
    joblevel_component = min(0.1, (joblevel - 1) * 0.03)

    score = age_component + income_component + joblevel_component + bt + ot + jr
    score = max(0.0, min(1.0, score))
    label = 'HIGH' if score >= 0.5 else 'LOW'
    return {"risk_score": round(score, 3), "risk_label": label}
