import dayjs from "dayjs";

export const newDateFormat = (date: Date) => {
  const DATE_STRING = "YYYY-MM-DDTHH:mm:ssZ";

  return dayjs(date).format(DATE_STRING);
};
