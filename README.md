# BM Design Studio

Production website for BM Design Studio, an Ahmedabad architecture and interior design practice. The site presents studio services, portfolio imagery, project details, and contact options. Content is loaded from a Google Apps Script endpoint backed by Google Sheets; image assets may be served from Supabase Storage or Google Drive.

## Stack

- Next.js 16 Pages Router, React 19, TypeScript
- Tailwind CSS, Radix UI, Lucide icons
- TanStack Query for client content fetching
- Google Apps Script content proxy at `/api/content`
- Firebase Analytics and Web3Forms contact submissions

## Local development

1. Install Node.js compatible with the installed Next.js release and run `npm install`.
2. Copy `.env.example` to `.env.local` and configure the variables described below.
3. Run `npm run dev` and open `http://localhost:3000`.

Production: `npm run build`, then `npm start`. `npm run lint` runs ESLint.

## Configuration

| Variable | Purpose | Exposure |
| --- | --- | --- |
| `GOOGLE_SHEET_API_URL` | Publicly deployed Apps Script `/exec` URL | Server only |
| `GOOGLE_SHEET_API_KEY` | Shared key sent by the server proxy | Server only |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for object paths | Browser |
| `NEXT_PUBLIC_SUPABASE_BUCKET` | Default public Storage bucket | Browser |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase app and Analytics configuration | Browser |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact form submission key | Browser |

Never expose the Google Sheets key through a `NEXT_PUBLIC_` variable. Keep production secrets in the deployment platform's environment configuration.

## Key paths

- `pages/`: route entries, API proxy, app and document wrappers
- `src/pages/`: page components for home, projects, portfolio, about, and project detail
- `src/components/`: shared UI, SEO helper, asset display, and navigation
- `src/services/sheetService.ts`: client data access and asset URL conversion
- `src/lib/driveUtils.ts`: Google Drive and Supabase public asset URL handling
- `src/types/cms.ts`: project and asset data contracts
- `public/`: static assets, robots policy, and sitemap

## Content model

The content API is expected to return `projects` and `assets` arrays. Projects use `project_id`, `project_title`, `property_type`, `year`, and `visibility`. Assets use `asset_id`, `project_id`, `asset_type`, `asset_url`, optional `thumbnail_url`, description, labels, display order, and visibility. Keep sheet values consistent with `src/types/cms.ts`.

## SEO and publishing

The sitemap and robots file are in `public/`. Verify the production canonical host, sitemap URL accessibility, page titles/descriptions, social previews, and crawlable project detail URLs after deployment. Project detail content is currently client-fetched, so ensure the production rendering strategy exposes meaningful page content to crawlers before relying on it for search indexing. See `AGENTS.md` for implementation guidance and the local Next.js documentation requirement.

## Design assets

P22 Mackinac Pro font files are served from `public/fonts/p22-mackinac`. Avoid committing credentials, downloaded content data, build output, or generated task notes.
