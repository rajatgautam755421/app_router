import { updatePost } from "@/actions/serverActions";
import { makeApiRequest } from "@/helpers/apiHelper";
import { notFound } from "next/navigation";
import PostInfo from "./PostInfo";

const Page = async ({ params }) => {
  const { data, error } = await makeApiRequest({
    endPoint: "api/post",
    requestBody: {
      id: params.postId,
      requestType: "findUnique",
    },
    method: "POST",
    cache: "no-store",
    next: {
      tags: ["post"],
    },
  });

  if (error) {
    throw new Error(error);
  }

  if (!data) return notFound();

  return (
    <div>
      <PostInfo data={data} updatePost={updatePost} />
    </div>
  );
};

export async function generateStaticParams() {
  const { data, error } = await makeApiRequest({
    endPoint: "api/post",
    method: "GET",
    cache: "force-cache",
  });

  if (error) throw new Error(error);

  return data.map((d) => ({ postId: d?.id }));
}

export default Page;
