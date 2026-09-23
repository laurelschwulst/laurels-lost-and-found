// Turns the raw session.json files in sessions/ (kept local, never committed)
// into what the site publishes: a date, a duration and an SVG of the path.
//
//   sessions/whatever.json  →  src/content/walks/2026-09-22.md
//                               public/paths/2026-09-22.svg
//
// Run with: npm run walks
import fs from 'node:fs';
import path from 'node:path';

const TIME_ZONE = 'America/Chicago'; // St. Louis
const SESSIONS_DIR = 'sessions';
const WALKS_DIR = 'src/content/walks';
const PATHS_DIR = 'public/paths';
const SVG_SIZE = 500;
const SVG_PADDING = 10;

// "2026-09-22" in St. Louis time.
function localDate(isoString) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date(isoString));
}

function durationMinutes(session) {
  return Math.round((new Date(session.endTime) - new Date(session.startTime)) / 60000);
}

function pathSvg(locationPoints) {
  // Drop fixes the phone itself wasn't sure about.
  const points = locationPoints.filter((p) => p.accuracy === undefined || p.accuracy <= 50);

  // Flat projection: fine at walking scale. Longitude is squeezed by cos(latitude)
  // so the shape isn't stretched sideways.
  const midLat = points.reduce((sum, p) => sum + p.latitude, 0) / points.length;
  const xs = points.map((p) => p.longitude * Math.cos((midLat * Math.PI) / 180));
  const ys = points.map((p) => -p.latitude);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const scale = (SVG_SIZE - SVG_PADDING * 2) / Math.max(maxX - minX, maxY - minY);
  const width = Math.round((maxX - minX) * scale + SVG_PADDING * 2);
  const height = Math.round((maxY - minY) * scale + SVG_PADDING * 2);

  const polyline = xs
    .map((x, i) => `${((x - minX) * scale + SVG_PADDING).toFixed(1)},${((ys[i] - minY) * scale + SVG_PADDING).toFixed(1)}`)
    .join(' ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <polyline points="${polyline}" fill="none" stroke="black" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
</svg>
`;
}

// Keep anything written below the frontmatter of an existing walk file.
function existingNotes(file) {
  if (!fs.existsSync(file)) return '';
  return fs.readFileSync(file, 'utf8').replace(/^---\n[\s\S]*?\n---\n?/, '');
}

const sessions = fs
  .readdirSync(SESSIONS_DIR)
  .filter((name) => name.endsWith('.json'))
  .map((name) => JSON.parse(fs.readFileSync(path.join(SESSIONS_DIR, name), 'utf8')))
  .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

const perDay = {};
for (const session of sessions) {
  const date = localDate(session.startTime);
  perDay[date] = (perDay[date] ?? 0) + 1;
  const id = perDay[date] === 1 ? date : `${date}-${perDay[date]}`; // second walk that day → 2026-09-22-2
  const duration = durationMinutes(session);

  fs.writeFileSync(path.join(PATHS_DIR, `${id}.svg`), pathSvg(session.locationPoints));

  const mdFile = path.join(WALKS_DIR, `${id}.md`);
  const frontmatter = `---\ndate: ${date}\nduration: ${duration}\npath: /paths/${id}.svg\n---\n`;
  fs.writeFileSync(mdFile, frontmatter + existingNotes(mdFile));

  console.log(`${id}: ${duration}min`);
}
