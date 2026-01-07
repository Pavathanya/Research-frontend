# PythonApi

This folder contains a small Flask API that loads the trained Keras model and an optional preprocessor (joblib .pkl) and exposes endpoints to check health and make predictions.

Run locally

1. Create a virtual environment and install requirements:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

2. Start the API:

```bash
python api.py
```

Endpoints
- `GET /health` — returns model/preprocessor/dataset status
- `POST /predict` — accepts a multipart `file` (CSV) or JSON array of records. Returns predictions and saves `Results/prediction_results.csv`.

Prediction script
- `predict_performance.py` — CLI script using the project's performance prediction logic. By default it reads `PredictionData/Newupload_employee.csv` and writes `Result/prediction_results.csv`.

Notes
- Place the Keras model at `Models/advanced_feedback_model.h5` and dataset at `Dataset/DataSet_New.csv`.
- The API will attempt to locate a `.pkl` preprocessor anywhere under the `PythonApi` folder. If none is found it will try to predict using numeric columns only.

Troubleshooting scikit-learn compatibility
 - If a health check shows an error like `No module named 'sklearn.ensemble._gb_losses'` or `InconsistentVersionWarning`:
	 - This means the serialized model was created with an older scikit-learn (commonly 1.2.1) and your current Python/runtime has a newer scikit-learn or incompatible Python version (e.g., Python 3.13).
	 - Recommended fixes:
		 1. Create a Python 3.11 virtual environment and install scikit-learn==1.2.1, then run the API there. Example (Windows PowerShell):
				```powershell
				py -3.11 -m venv .venv_skl121
				.\.venv_skl121\Scripts\Activate.ps1
				python -m pip install --upgrade pip setuptools wheel
				pip install scikit-learn==1.2.1 joblib flask flasgger pandas numpy
				python api.py
				```
		 2. Or use conda to create an environment with Python 3.11 and scikit-learn 1.2.1.
		 3. As a longer-term fix, re-create and save the model using your current scikit-learn version.

 - The retention API exposes an endpoint `POST /retention/reload` to attempt reloading the model at runtime after you change environment or replace the model file.
