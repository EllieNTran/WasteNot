# API

The API handles server-side logic and communication between the mobile app and AI services.

## Run Locally

From the api folder:

Install dependencies
```bash
npm install
```

Create a `.env` file with your configuration:
```bash
PORT=4001
BUCKET_NAME=user-images
AI_SERVICE_URL=https://wastenot-ai.onrender.com
SUPABASE_URL=https://nhotuxtrsnxuxwlalept.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run server (environment variables are auto-loaded from .env):
```bash
npm start
```
