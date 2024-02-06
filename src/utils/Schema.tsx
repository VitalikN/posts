import { object, string } from "yup";

export const validationSchema = object().shape({
  username: string().required("Required field!"),

  email: string().required("Required field!"),
  password: string()
    .min(6, "Password must be at least 6 characters long!")
    .required("Required field!"),
});

export const validationSchemaLogin = object().shape({
  identifier: string().required("Required field!"),
  password: string()
    .min(6, "Password must contain at least 6 characters!")
    .required("Required field!"),
});

export const validationSchemaAdd = object().shape({
  title: string().required("Required field!"),
  datetime: string().required("Required field!"),
});
