import * as yup from "yup";

export const createFundTransactionSchema = yup.object({
  date: yup.date().required("Date is required field"),
  description: yup.string().required("Description is required field"),
  amount: yup
    .number()
    .required("Amount is required field")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Amount must be greater than or equal to zero")
    .typeError("Amount must be a number"),
});

export type TCreateFundTransactionSchema = yup.InferType<
  typeof createFundTransactionSchema
>;

export const createExpenseTransactionSchema = yup.object({
  date: yup.date().required("Date is required field"),
  description: yup.string().required("Description is required field"),
  amount: yup
    .number()
    .required()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Amount must be greater than or equal to zero")
    .typeError("Amount must be a number"),
  fundCollectionId: yup.string().required("fundCollectionId is required field"),
});

export type TCreateExpenseTransactionSchema = yup.InferType<
  typeof createExpenseTransactionSchema
>;

export const updateExpenseTransactionSchema = yup.object({
  date: yup.date().required("Date is required field"),
  description: yup.string().required("Description is required field"),
  amount: yup
    .number()
    .required()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Amount must be greater than or equal to zero")
    .typeError("Amount must be a number"),
  fundCollectionId: yup.string().required("fundCollectionId is required field"),
});

export type TUpdateExpenseTransactionSchema = yup.InferType<
  typeof updateExpenseTransactionSchema
>;
