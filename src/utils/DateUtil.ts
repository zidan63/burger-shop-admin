import moment, { Moment } from "moment";
export const getTimeThisWeekDates = () => {
  const weekDates: number[] = [];

  for (var i = 1; i <= 7; i++) {
    weekDates.push(moment().day(i).toDate().getTime());
  }

  return weekDates;
};

export const getDatesThisWeekDates = () => {
  const weekDates: number[] = [];

  for (var i = 1; i <= 7; i++) {
    weekDates.push(moment().day(i).date());
  }

  return weekDates;
};
export const listMonths = (): string[] => {
  const alias = "Tháng ";
  const months: string[] = [];
  for (var i = 1; i <= 12; i++) {
    months.push(`${alias}${i}`);
  }
  return months;
};
export const dayOfWeekAsInteger = (number) => {
  const weekday = new Array(7);
  weekday[0] = 1;
  weekday[1] = "Tuesday";
  weekday[2] = "Wednesday";
  weekday[3] = "Thursday";
  weekday[4] = "Friday";
  weekday[5] = 4;
  weekday[6] = "Sunday";
  return weekday[number];
};
