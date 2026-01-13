# Mobile Application

The mobile application handles the user interface of WasteNot.

## Run Locally

From the mobile-app folder:

Install dependencies
```bash
npm install
```

Create a `.env` file with your API keys:
```bash
EXPO_PUBLIC_API_URL=https://wastenot-api-5yb2.onrender.com/api/
EXPO_PUBLIC_SUPABASE_URL=https://nhotuxtrsnxuxwlalept.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run app (environment variables are auto-loaded from .env):
```bash
npx expo start --tunnel
```

## Run on Smartphone

Download the Expo Go app on your smartphone and scan the QR code displayed in the terminal.
