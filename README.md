# Laurel's Lost and Found

A bare-bones Astro site of walks.

Needs Node 20.3+ (or 22+). `npm install`, then `npm run dev` to run locally, `npm run build` to build to `dist/`.

## Adding a walk

1. Put the walk's `session.json` in `sessions/` (any file name). This folder is git-ignored: the raw GPS data stays on your computer.
2. Run `npm run walks`. For every session it writes:
   - `src/content/walks/<date>.md` with the date (St. Louis time) and duration in minutes. Anything you write below the `---` shows on the walk's page and is kept when you re-run.
   - `public/paths/<date>.svg`, the drawing of the path.
3. Commit those two files.
