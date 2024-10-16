import * as yup from "yup";

export const createExpenseCollectionSchema = yup.object({
  name: yup.string().required("Name is required field"),
});

export type TCreateExpenseCollectionSchema = yup.InferType<
  typeof createExpenseCollectionSchema
>;

export const updateExpenseCollectionSchema = yup.object({
  name: yup.string().required("Name is required field"),
});

export type TUpdateExpenseCollectionSchema = yup.InferType<
  typeof updateExpenseCollectionSchema
>;
