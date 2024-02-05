import PostId from "@/components/PostId";

const Post = ({ params: { id } }: { params: { id: string } }) => (
  <PostId id={id} />
);

export default Post;
