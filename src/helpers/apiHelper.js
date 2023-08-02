import { cookies } from "next/dist/client/components/headers";
import { API_URL } from "./constant";

export const makeApiRequest = async ({
  endPoint,
  method = "GET",
  cache,
  requestBody,
  next = {},
}) => {
  // const nextCookie = cookies();

  // let user;

  // const userCookie = nextCookie.get("user")?.value;

  // if (userCookie) {
  //   user = JSON.parse(userCookie)?.data;
  // }

  const res = await fetch(API_URL + endPoint, {
    method,
    cache,
    body: JSON.stringify(requestBody),
    next: next,
    headers: { token: "jekhjhjhj" },
  });

  const { data, error } = await res.json();

  if (error) {
    return { error };
  }

  if (data?.error) {
    return { error: data.error };
  }

  return { data };
};
