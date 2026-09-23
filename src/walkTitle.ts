const TIME_ZONE = 'America/Chicago';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// e.g. "Sept 22, 50min"
export function walkTitle(startTime: Date, endTime: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, month: 'numeric', day: 'numeric' })
    .formatToParts(startTime);
  const month = Number(parts.find((p) => p.type === 'month')!.value);
  const day = parts.find((p) => p.type === 'day')!.value;
  const minutes = Math.round((endTime.valueOf() - startTime.valueOf()) / 60000);
  return `${MONTHS[month - 1]} ${day}, ${minutes}min`;
}
