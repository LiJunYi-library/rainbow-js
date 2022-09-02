declare class DATE extends Date {
  setEndMilliseconds(): DATE;
  setEndSeconds(): DATE;
  setEndMinutes(): DATE;
  setEndHours(): DATE;
  setEndDay(): DATE;
  setEndMonth(): DATE;
  setEnd(parms: string): DATE;
  setStartMilliseconds(): DATE;
  setStartSeconds(): DATE;
  setStartMinutes(): DATE;
  setStartHours(): DATE;
  setStartDay(): DATE;
  setStartMonth(): DATE;
  setStart(parms: string): DATE;
  setAgo(parms: DateOptions): DATE;
  fomatter(parms: string): string;
  static surplusTime(endTime:number): string;
  static cruateDate(stringTime:string, format : string): DATE;
}

declare type DateOptions = {
  FullYear?: number,
  Month?: number,
  Date?: number,
  Hours?: number,
  Minutes?: number,
  Seconds?: number,
  Time?: number,
  Milliseconds?: number,
  Day?: number,
}
declare function useDate(): void
export { DATE, DateOptions, useDate };