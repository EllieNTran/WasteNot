# Backend

The backend handles the ingredient detection and recipe generation.

## Run Locally with Python

From the backend folder:

Set up virtual environment and install dependencies
```bash
python3.12 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
```

Authenticate Google Cloud account
```bash
gcloud auth application-default login
```

Set environment variables (insert your API keys) and run FastAPI app
```bash
export GOOGLE_API_KEY=""
export ROBOFLOW_API_KEY=""
export BUCKET_NAME="waste-not-bucket"
fastapi dev app/main.py
```
