"use client";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../sass/layouts/login.module.scss";
import { useRegisterMutation } from "@/redux/auth/authAPI";
import { useRouter } from "next/navigation";
import { validationSchema } from "@/utils/Schema";
import { ErrorFeedbackProps, FormValues } from "@/utils/type";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
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
    await register(values)
      .unwrap()
      .then((res) => {
        {
          res.jwt
            ? toast.success("Successfully registered! ")
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
        <h2 className={styles.title}>Registration</h2>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
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
