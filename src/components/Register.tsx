"use client";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../sass/layouts/login.module.scss";
import { useRegisterMutation } from "@/redux/auth/authAPI";

export interface ErrorFeedbackProps {
  name: string;
}
export interface FormValues {
  username?: string;
  email: string;
  password: string;
}

export const validationSchemaRegister = object().shape({
  username: string().required("Required field!"),

  email: string().required("Required field!"),
  password: string()
    .min(6, "Password must be at least 6 characters long!")
    .required("Required field!"),
});

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };
  const handleRegister = async (values: FormValues) => {
    try {
      const response = await register(values);
      if ("data" in response) {
        toast.success(
          "Successfully registered! Please proceed to sign in for confirmation."
        );
      } else {
        toast.error("Invalid login or password.");
      }
    } catch (error) {
      toast.error("Invalid login or password.");
    }
  };
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await handleRegister(values);
      toast.success("Successful registration!");

      resetForm();
    } catch (error) {
      toast.error("Registration failed.");
    }
  };
  return (
    <section>
      <div className={`${styles.container} `}>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaRegister}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  Name:
                  <Field
                    className={styles.input}
                    type="text"
                    name="username"
                    error={touched.username && errors.username}
                  />
                </label>

                <ErrorFeedback name="username" />
              </div>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  Email:
                  <Field
                    className={styles.input}
                    type="email"
                    name="email"
                    error={touched.email && errors.email}
                  />
                </label>
                <ErrorFeedback name="email" />
              </div>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  Password:
                  <Field
                    className={styles.input}
                    type="password"
                    name="password"
                    error={touched.password && errors.password}
                  />
                </label>

                <ErrorFeedback name="password" />
              </div>
              <button className={styles.styledBtn} type="submit">
                {isLoading ? "Loading...." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.text__register}>
          Already have an account?
          <Link className={styles.link__register} href="/login">
            Sign in
          </Link>
        </p>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          theme="light"
        />
      </div>
    </section>
  );
};

export default Register;
