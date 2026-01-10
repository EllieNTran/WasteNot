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

Create a `.env` file with your API keys:
```bash
GOOGLE_API_KEY=your_google_api_key
ROBOFLOW_API_KEY=your_roboflow_api_key
BUCKET_NAME=user-images
SUPABASE_URL=https://nhotuxtrsnxuxwlalept.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run FastAPI app (environment variables are auto-loaded from .env):
```bash
fastapi dev app/main.py
```
