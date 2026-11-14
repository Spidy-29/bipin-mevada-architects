# BM Design Studio website

This project uses Next.js (Pages Router), React, TypeScript, and Tailwind CSS. Supabase asset URLs can be full public URLs or object paths relative to the configured bucket (for example, `images/my-image.jpg`).

## Run locally

1. Copy `.env.example` to `.env` and fill in `GOOGLE_SHEET_API_URL` and `GOOGLE_SHEET_API_KEY` for the server-side content proxy, `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_BUCKET` for public Storage assets, plus the Firebase values. Do not use `NEXT_PUBLIC_` for the Sheets credentials.
2. Create a Web3Forms access key for `bipin@bmdesignstudio.in` and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env`.
3. Install dependencies with `npm install`.
4. Start the development server with `npm run dev`.

Production commands: `npm run build` and `npm start`.

P22 Mackinac Pro font files are served from `public/fonts/p22-mackinac`. Firebase Analytics uses `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` and records page views and lead submissions. The browser requests `/api/content`; the Next.js API route forwards to Google Apps Script so browser CORS rules do not block the request.
