import * as yup from "yup";

export const createFundCollectionSchema = yup.object({
  name: yup.string().required("Name is required field"),
});

export type TCreateFundCollectionSchema = yup.InferType<
  typeof createFundCollectionSchema
>;
