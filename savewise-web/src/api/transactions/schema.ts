import * as yup from "yup";

export const createFundTransactionSchema = yup.object({
  date: yup.date().required("Date is required field"),
  description: yup.string().required("Description is required field"),
  amount: yup
    .number()
    .required("Amount is required field")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Amount must be greater than or equal to zero")
    .typeError("Amount is a required field"),
});

export type TCreateFundTransactionSchema = yup.InferType<
  typeof createFundTransactionSchema
>;

export const updateFundTransactionSchema = yup.object({
  date: yup.date().required("Date is required field"),
  description: yup.string().required("Description is required field"),
  amount: yup
    .number()
    .required()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Amount must be greater than or equal to zero")
    .typeError("Amount is a required field"),
  fundCollectionId: yup.string().required("fundCollectionId is required field"),
});

export type TUpdateFundTransactionSchema = yup.InferType<
  typeof updateExpenseTransactionSchema
>;

export const createExpenseTransactionSchema = yup.object({
  date: yup.date().required("Date is required field"),
  description: yup.string().required("Description is required field"),
  amount: yup
    .number()
    .required()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Amount must be greater than or equal to zero")
    .typeError("Amount is a required field"),
  fundCollectionId: yup.string().required("Source is required field"),
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
    .typeError("Amount is a required field"),
  fundCollectionId: yup.string().required("fundCollectionId is required field"),
});

export type TUpdateExpenseTransactionSchema = yup.InferType<
  typeof updateExpenseTransactionSchema
>;
