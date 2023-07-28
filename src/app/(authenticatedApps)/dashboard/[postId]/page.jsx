import { makeApiRequest } from "@/helpers/apiHelper";
import { POST_FIELDS } from "@/helpers/constant";
import { notFound } from "next/navigation";
import PostInfo from "./PostInfo";

async function updatePost(post, id) {
  "use server";

  const postData = {};

  POST_FIELDS.forEach(({ key }) => {
    postData[key] = post?.get(key)?.valueOf();
  });

  const { data, error } = await makeApiRequest({
    endPoint: `api/post`,
    requestBody: {
      ...postData,
      id,
    },
    method: "PUT",
    cache: "no-store",
  });

  if (error) {
    throw new Error(error);
  }

  return data;
}

const Page = async ({ params }) => {
  const { data, error } = await makeApiRequest({
    endPoint: "/api/post",
    requestBody: {
      id: params.postId,
      requestType: "findUnique",
    },
    method: "POST",
    cache: "no-store",
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

export default Page;
