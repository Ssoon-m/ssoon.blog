import dayjs, { Dayjs } from 'dayjs';

type DateType = string | number | Date | Dayjs;

export const dateFormatter = (date: DateType, format: string) => {
  return dayjs(date).locale('ko').format(format);
};

export const dateCompare = (date: DateType, compareDate: DateType) => {
  return dayjs(date).diff(compareDate);
};

export const displayTime = (createdAt: Date | string) => {
  const milliSeconds = Date.now() - new Date(createdAt).getTime();
  const seconds = milliSeconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  if (hours < 60) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};
