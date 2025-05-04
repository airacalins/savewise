import * as yup from "yup";

export const registerUserSchema = yup.object({
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Passwords must be at least 6 characters.")
    .matches(/[a-z]/, "Passwords must have at least one lowercase ('a'-'z').")
    .matches(/[A-Z]/, "Passwords must have at least one uppercase ('A'-'Z').")
    .matches(
      /[^a-zA-Z0-9]/,
      "Passwords must have at least one non alphanumeric character."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required field"),
});

export type IRegisterUserSchema = yup.InferType<typeof registerUserSchema>;

export const loginUserSchema = yup.object({
  email: yup.string().required("Email is required field"),
  password: yup.string().required("Password is required field"),
});

export type ILoginUserSchema = yup.InferType<typeof loginUserSchema>;
