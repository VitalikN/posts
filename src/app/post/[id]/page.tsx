import PostId from "@/components/PostId";

const Post = ({ params: { id } }: { params: { id: string } }) => {
  return <PostId id={id} />;
};

export default Post;
