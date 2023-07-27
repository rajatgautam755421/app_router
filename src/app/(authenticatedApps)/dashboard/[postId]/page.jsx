import { notFound } from "next/navigation";
import PostInfo from "./PostInfo";

export const generateStaticParams = async () => {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 10 },
  });

  const data = await res.json();

  return data.filter((d) => d?.id < 5).map((d) => ({ postId: String(d.id) }));
};

const Page = async ({ params }) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/${params?.postId}`,
    { cache: "force-cache" }
  );

  const data = await res.json();

  return (
    <div>
      <PostInfo data={data} />
    </div>
  );
};

export default Page;
