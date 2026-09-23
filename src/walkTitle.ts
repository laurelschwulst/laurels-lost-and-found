// "2026-09-22" → "9.22.2026"
export function walkTitle(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return `${month}.${day}.${year}`;
}
