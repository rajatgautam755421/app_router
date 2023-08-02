import { createPost } from "@/actions/serverActions";
import { makeApiRequest } from "@/helpers/apiHelper";
import Link from "next/link";
import Posts from "./Posts";

async function fetchPosts(searchQuery) {
  const { data, error } = await makeApiRequest({
    endPoint: "api/post",
    cache: "force-cache",
    method: searchQuery ? "POST" : "GET",
    next: {
      tags: ["post"],
    },
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
          {searchQuery ? (
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
