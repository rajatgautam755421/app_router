import { makeApiRequest } from "@/helpers/apiHelper";
import { POST_FIELDS } from "@/helpers/constant";
import Link from "next/link";
import Posts from "./Posts";

async function createPost(post) {
  "use server";

  const postData = {};

  POST_FIELDS.forEach(({ key }) => {
    postData[key] = post?.get(key)?.valueOf();
  });

  const { data, error } = await makeApiRequest({
    endPoint: "/api/post",
    requestBody: {
      ...postData,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    method: "POST",
    cache: "no-cache",
  });

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function fetchPosts(searchQuery) {
  const { data, error } = await makeApiRequest({
    endPoint: "api/post",
    cache: "no-cache",
    method: searchQuery ? "POST" : "GET",
    requestBody: searchQuery
      ? { requestType: "search", searchQuery: searchQuery }
      : undefined,
  });

  return { data, error };
}

export default async function Home({ searchParams }) {
  let searchQuery = searchParams?.search;

  const { data, error } = await fetchPosts(searchQuery);

  if (error) {
    throw new Error(error);
  }
  return (
    <>
      {data?.length !== 0 ? (
        <Posts data={data} createPost={createPost} />
      ) : (
        <>
          {serachQuery ? (
            <div className="d-flex flex-column">
              <h6 className="text-center my-2">
                No Post Found with query &lsquo;{searchParams?.search}&rsquo;
              </h6>
              <Link href={"/dashboard"} className="text-center">
                Visit Home
              </Link>
            </div>
          ) : (
            <h6 className="text-center my-2">No Posts Found</h6>
          )}
        </>
      )}
    </>
  );
}
