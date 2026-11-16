# Repository guidance for coding agents

## Before changing code

- Read the relevant implementation and types before editing. Use `rg` to trace callers and consumers.
- This repository uses Next.js 16, whose APIs and conventions may differ from older versions. Before any Next.js code or configuration change, read the relevant guide under `node_modules/next/dist/docs/` (Pages Router guides are under `02-pages`; App Router guides are under `01-app`). Follow current deprecation notes. Do not guess from prior Next.js knowledge.
- For a route change, inspect its entry in `pages/`, its component in `src/pages/`, shared SEO/layout behavior, and the matching `public/robots.txt` or `public/sitemap.xml` when relevant.
- For content or asset work, inspect `src/types/cms.ts`, `src/services/sheetService.ts`, `src/lib/driveUtils.ts`, and `pages/api/content.ts` as relevant. The Google Sheets credentials are server-only.
- For UI work, inspect the shared component and CSS/Tailwind conventions before introducing dependencies or global styles.

## Project architecture

- Next.js Pages Router route files live in `pages/`; most React page implementations live in `src/pages/`.
- Shared components and hooks live under `src/components/` and `src/hooks/`.
- Content is fetched through `/api/content`, which proxies a Google Apps Script endpoint. TanStack Query hooks are in `src/hooks/useContent.ts`.
- Static SEO files are in `public/`. Update them when route availability or canonical domain changes.
- Runtime configuration is documented in `.env.example` and `README.md`.

## Quality and production behavior

- Keep accessible names, semantic heading order, descriptive image alternatives, and keyboard behavior intact.
- Avoid logging personal data, credentials, URLs containing secrets, or routine errors to the browser/server console. Return useful error states through the UI or API response. Do not leave debug logging in production paths.
- Preserve existing user changes. Do not delete project content or assets unless explicitly requested.
- Do not add dependencies unless the task needs them. Do not run tests or builds unless asked to verify, or when a change cannot be responsibly reviewed without that check.
- Keep documentation focused: maintain `README.md` for project use and this file for agent workflow. Do not add temporary fix summaries or prompt dumps to the repository.

## Useful commands

- `npm run dev`: local development
- `npm run build`: production build
- `npm run lint`: ESLint
