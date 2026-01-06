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
