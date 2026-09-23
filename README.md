# Laurel's Lost and Found

A bare-bones Astro site of walks.

- Needs Node 20.3+ (or 22+). `npm install`, then `npm run dev` to run locally, `npm run build` to build to `dist/`.
- Each walk is a `session.json` exported from the walk app, dropped into `src/content/walks/` and renamed by date (e.g. `2026-09-22.json`). The title (date + duration) and the path drawing are worked out from the file.
