"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "../sass/layouts/addPost.module.scss";

import { object, string } from "yup";
import { useUpdatePostMutation } from "@/redux/postsApiUser/postsApiUser";
import { useRouter } from "next/navigation";

import authSelector from "@/redux/auth/authSelector";
import { useSelector } from "react-redux";

export const validationSchemaAdd = object().shape({
  title: string().required("Required field!"),
  datetime: string().required("Required field!"),
});
export interface ErrorFeedbackProps {
  name: string;
}
export type FormValuesAdd = {
  title: string;
  datetime: string;
};
const UpdatePost = ({ res }: any) => {
  const router = useRouter();
  const jwt = useSelector(authSelector.selectJwt);
  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };

  const [updatePost] = useUpdatePostMutation();

  const handleSubmit = async (
    values: FormValuesAdd,

    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if (!jwt) {
        router.push("/login");
        return;
      }

      await updatePost({ data: { data: { ...values } }, id: res.id });
      resetForm();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={`${styles.add_post}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Update a Post</h2>
        <Formik
          initialValues={{ title: "", datetime: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaAdd}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.form__box}>
                <Field
                  className={styles.input}
                  placeholder="title"
                  type="text"
                  name="title"
                  error={touched.title && errors.title}
                />
                <ErrorFeedback name="title" />
              </div>
              <div className={styles.form__box}>
                <Field
                  className={styles.input}
                  type="date"
                  name="datetime"
                  min={new Date().toISOString().split("T")[0]}
                  error={touched.datetime && errors.datetime}
                />
                <ErrorFeedback name="datetime" />
              </div>

              <button className={styles.styledBtn} type="submit">
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default UpdatePost;
