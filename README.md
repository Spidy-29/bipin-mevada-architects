# BM Design Studio website

This project uses Next.js (Pages Router), React, TypeScript, and Tailwind CSS.

## Run locally

1. Copy `.env.example` to `.env` and fill in the Google Sheets and Firebase values.
2. Create a Web3Forms access key for `bipin@bmdesignstudio.in` and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env`.
3. Install dependencies with `npm install`.
4. Start the development server with `npm run dev`.

Production commands: `npm run build` and `npm start`.

P22 Mackinac Pro font files are served from `public/fonts/p22-mackinac`. Firebase Analytics uses the existing `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` value and records page views and lead submissions.
