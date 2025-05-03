import * as yup from "yup";

export const registerUserSchema = yup.object({
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required field"),
  password: yup.string().required("Password is required field"),
  confirmPassword: yup.string().required("Confirm password is required field"),
});

export type IRegisterUserSchema = yup.InferType<typeof registerUserSchema>;

export const loginUserSchema = yup.object({
  email: yup.string().required("Email is required field"),
  password: yup.string().required("Password is required field"),
});

export type ILoginUserSchema = yup.InferType<typeof loginUserSchema>;
