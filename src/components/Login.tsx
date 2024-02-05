"use client";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";

import styles from "../sass/layouts/login.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "@/redux/auth/authAPI";
import { useRouter } from "next/navigation";
import { object, string } from "yup";

export const validationSchema = object().shape({
  identifier: string().required("Required field!"),
  password: string()
    .min(6, "Password must contain at least 6 characters!")
    .required("Required field!"),
});

export interface FormValues {
  name?: string;
  identifier: string;
  password: string;
}

export interface ErrorFeedbackProps {
  name: string;
}

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    await login(values)
      .unwrap()
      .then((res) => {
        {
          res.jwt
            ? toast.success("Successfully logged in!")
            : toast.error("Invalid login or password.");
        }
        resetForm();
        router.push("/");
      })

      .catch(() => toast.error("Invalid login or password."));
  };
  return (
    <section className={styles.section__login}>
      <div className={`${styles.container} `}>
        <h2 className={styles.title}>Login</h2>

        <Formik
          initialValues={{ identifier: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  identifier:
                  <Field
                    className={styles.input}
                    type="email"
                    name="identifier"
                    error={touched.identifier && errors.identifier}
                  />
                </label>
                <ErrorFeedback name="identifier" />
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
                {isLoading ? "Loading...." : "Sign in"}
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.text__register}>
          Don`t have an account yet?
          <Link className={styles.link__register} href="/register">
            Register now
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
export default Login;
