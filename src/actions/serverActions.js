"use server";

import { makeApiRequest } from "@/helpers/apiHelper";
import { POST_FIELDS } from "@/helpers/constant";
import { revalidateTag } from "next/cache";

export async function createPost(post) {
  const postData = {};

  POST_FIELDS.forEach(({ key }) => {
    postData[key] = post?.get(key)?.valueOf();
  });

  const { data, error } = await makeApiRequest({
    endPoint: "api/post",
    requestBody: {
      ...postData,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    method: "POST",
    cache: "force-cache",
  });

  // revalidateTag("post");

  return { data, error };
}

export async function deletePost(id) {
  const { data, error } = await makeApiRequest({
    endPoint: "api/post",
    requestBody: {
      id,
    },
    method: "DELETE",
  });

  // revalidateTag("post");

  return { data, error };
}

export async function updatePost(post, id) {
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
    cache: "force-cache",
  });

  // revalidateTag("post");

  return { data, error };
}

export async function handleLoginClick(userValues) {
  "use server";

  const postData = {};

  postData["email"] = userValues?.get("email")?.valueOf();
  postData["password"] = userValues?.get("password")?.valueOf();

  if (!postData.email || !postData?.password) {
    return { error: "Fields Cannot Be Empty" };
  }

  const { data, error } = await makeApiRequest({
    endPoint: "api/user",
    method: "POST",
    requestBody: {
      requestType: "login",
      ...postData,
    },
  });

  return { data, error };
}
