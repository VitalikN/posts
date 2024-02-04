"use client";

import { useGetPostQuery } from "@/redux/postsApiUser/postsApiUser";

import styles from "../sass/layouts/postId.module.scss";

interface PostId {
  id: string;
}
const PostId: React.FC<PostId> = ({ id }) => {
  const { data, error, isLoading } = useGetPostQuery(id);
  if (!data) {
    return <div>Loading...</div>;
  }
  const {
    data: {
      id: postId,
      attributes: { title },
    },
  } = data;

  return (
    <section>
      <div className={`${styles.container} `}>
        <h2>Post Id: {postId}</h2>
        <div>
          <p key={postId}>{title}</p>
        </div>
      </div>
    </section>
  );
};
export default PostId;
