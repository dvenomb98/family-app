import { Status } from '../Types/enums';

export const formatDateUtil = (string: string) => {
  return new Date(string).toLocaleDateString();
};

export const isExpired = (date: string) => {
  const currentDate = new Date();
  const givenDate = new Date(date);
  if (currentDate > givenDate) return true;
  return false;
};
