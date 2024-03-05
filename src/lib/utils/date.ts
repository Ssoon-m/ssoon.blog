import dayjs, { Dayjs } from 'dayjs';

type DateType = string | number | Date | Dayjs;

export const dateFormatter = (date: DateType, format: string) => {
  return dayjs(date).locale('ko').format(format);
};

export const dateCompare = (date: DateType, compareDate: DateType) => {
  return dayjs(date).diff(compareDate);
};
