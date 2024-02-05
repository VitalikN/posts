"use client";

import {
  useDeletePostMutation,
  useGetPostQuery,
} from "@/redux/postsApiUser/postsApiUser";

import styles from "../sass/layouts/postId.module.scss";
import { MdCreate, MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
import authSelector from "@/redux/auth/authSelector";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "./Modal";
import Loader from "./Loader";
interface PostId {
  id: string;
}
const PostId: React.FC<PostId> = ({ id }) => {
  const [deletePost] = useDeletePostMutation();
  const { data, error, isLoading } = useGetPostQuery(id);
  const router = useRouter();
  const jwt = useSelector(authSelector.selectJwt);
  const [selectedPost, setSelectedPost] = useState(null);

  if (!jwt) {
    router.push("/login");
  }
  if (!data) {
    return <Loader />;
  }
  const handleCreate = (data: any) => {
    setSelectedPost(data);
  };

  const {
    data: {
      id: postId,
      attributes: {
        title,
        datetime,

        user,
      },
    },
  } = data;

  const handleDelete = async (id: string) => {
    await deletePost(id).unwrap();
    router.push("/");
  };
  return (
    <section className={styles.postId__section}>
      <div className={`${styles.container} `}>
        <h2 className={styles.title}>Post Id: {postId}</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.box__post__id}>
            <h2 className={styles.text}>
              Author: {user?.data?.attributes?.username || "Anonymous"}
            </h2>
            <p className={styles.text}>{title}</p>
            <time>Data:{datetime}</time>

            <div className={styles.box__icon}>
              <MdCreate
                onClick={() => handleCreate({ id, title, datetime })}
                className={styles.icon}
              />
              <MdDeleteForever
                onClick={() => handleDelete(id)}
                className={styles.icon}
              />
            </div>
          </div>
        )}
        {selectedPost && (
          <Modal
            data={selectedPost}
            isOpen={true}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>
    </section>
  );
};
export default PostId;
