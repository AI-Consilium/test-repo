export function calculateDateDifference(date1: string, date2: string): number {
  const difference = new Date(date2) - new Date(date1);
  return Math.abs(difference / (1000 * 60 * 60 * 24));
}