const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// e.g. "Sept 22, 50min"
export function walkTitle(date: Date, duration: number): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${duration}min`;
}
