import BlogDetailPage from "@/features/blog/BlogDetailPage";

const blogDetail = ({ params }: { params: { id: string } }) => {
  return <BlogDetailPage blogId={Number(params.id)} />;
};

export default blogDetail;
