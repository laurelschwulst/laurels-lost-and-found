const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// "2026-09-22", 50 → "Sept 22, 50min"
export function walkTitle(date: string, duration: number): string {
  const [, month, day] = date.split('-').map(Number);
  return `${MONTHS[month - 1]} ${day}, ${duration}min`;
}
