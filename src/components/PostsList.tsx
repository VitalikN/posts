"use client";

import authSelector from "@/redux/auth/authSelector";
import { useGetAllPostsQuery } from "@/redux/postsApi/postsApi";
import Link from "next/link";
import { useSelector } from "react-redux";

import styles from "../sass/layouts/postsList.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { useDeletePostMutation } from "@/redux/postsApiUser/postsApiUser";

interface Post {
  id: string;
  attributes: {
    title: string;
  };
}
const PostsList = () => {
  const { data, error, isLoading, refetch } = useGetAllPostsQuery({});
  const [deletePost] = useDeletePostMutation();
  const jwt = useSelector(authSelector.selectJwt);

  //

  const handleDelete = async (id: string) => {
    if (!jwt) {
      toast.error("User is not authenticated. Please sign in.");
      return;
    }

    await deletePost(id).unwrap();
    toast.success(`Post delete`);
    refetch();
  };

  //
  return (
    <section className={styles.posts__list__section}>
      <div className={`${styles.container} `}>
        <h1 className={styles.title}>Posts List</h1>
        <ul className={styles.list}>
          {isLoading ? (
            <div>loding .. </div>
          ) : (
            data?.data?.map(({ id, attributes: { title } }: Post) => (
              <li key={id} className={styles.item}>
                {jwt ? (
                  <Link
                    href={`/post/${id}`}
                    className={`${styles.link} ${styles.text}`}
                  >
                    {title}
                  </Link>
                ) : (
                  <p className={styles.text}>{title}</p>
                )}

                <MdDeleteForever
                  onClick={() => handleDelete(id)}
                  className={styles.icon}
                />
              </li>
            ))
          )}
        </ul>
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
export default PostsList;
