import * as yup from "yup";

export const createCollectionSchema = yup.object({
  name: yup.string().required("Name is required field"),
  collectionType: yup.string().required("Collection type is required field"),
});

export type TCreateCollectionSchema = yup.InferType<
  typeof createCollectionSchema
>;

export const updateCollectionSchema = yup.object({
  name: yup.string().required("Name is required field"),
});

export type TUpdateCollectionSchema = yup.InferType<
  typeof updateCollectionSchema
>;
