import { DateUtil } from './dateUtil';
export class DateDifferenceCalculator {
  calculateDifference(date1: Date, date2: Date): number {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs;
  }
}