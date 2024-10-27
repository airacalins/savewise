import { isNil } from "lodash";

export const formatNumberWithCommas = (
  amount?: number | string,
  decimalCount = 2
) => {
  if (isNil(amount) || (typeof amount === "string" && amount.trim() === "")) {
    return "";
  }

  const numericAmount = typeof amount === "string" ? Number(amount) : amount;

  return numericAmount.toLocaleString("en-US", {
    minimumFractionDigits: decimalCount,
    maximumFractionDigits: decimalCount,
  });
};
