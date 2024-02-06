"use client";

import authSelector from "@/redux/auth/authSelector";
import { useGetAllPostsQuery } from "@/redux/postsApi/postsApi";
import Link from "next/link";
import { useSelector } from "react-redux";

import styles from "../sass/layouts/postsList.module.scss";
import { useEffect } from "react";
import Loader from "./Loader";
import { Post } from "@/utils/type";

const PostsList = () => {
  const { data, error, isLoading, refetch } = useGetAllPostsQuery({});

  const jwt = useSelector(authSelector.selectJwt);
  useEffect(() => {
    refetch();
  }, [data, refetch]);
  if (!data) return <Loader />;

  return (
    <section className={styles.posts__list__section}>
      <div className={`${styles.container} ${styles.posts__container} `}>
        <h1 className={styles.title}>Posts List</h1>
        {isLoading ? (
          <Loader />
        ) : data?.meta?.pagination?.total > 0 ? (
          <ul className={styles.list}>
            {isLoading ? (
              <Loader />
            ) : (
              data?.data?.map(
                ({ id, attributes: { title, datetime, user } }: Post) => (
                  <li key={id} className={styles.item}>
                    {jwt ? (
                      <Link
                        href={`/post/${id}`}
                        className={`${styles.link} ${styles.text}`}
                      >
                        <h2 className={styles.text}>
                          Author:{" "}
                          {user?.data?.attributes?.username || "Anonymous"}
                        </h2>{" "}
                        <p className={styles.text}>{title}</p>
                        <time>Data:{datetime}</time>
                      </Link>
                    ) : (
                      <p className={styles.text}>{title}</p>
                    )}
                  </li>
                )
              )
            )}
          </ul>
        ) : (
          <h2 className={styles.title}>Create posts </h2>
        )}
      </div>
    </section>
  );
};
export default PostsList;
