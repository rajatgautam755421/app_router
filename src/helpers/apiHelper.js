import { cookies } from "next/dist/client/components/headers";
import { API_URL } from "./constant";

export const makeApiRequest = async ({
  endPoint,
  method = "GET",
  cache,
  requestBody,
}) => {
  const nextCookie = cookies();

  const user = nextCookie.get("user")?.value;

  const res = await fetch(API_URL + endPoint, {
    method,
    cache,
    body: JSON.stringify(requestBody),
    next: !cache ? { revalidate: 5 } : {},
    headers: { token: user },
  });

  const { data, error } = await res.json();

  if (error) {
    return { error };
  }

  if (data.error) {
    return { error: data.error };
  }

  return { data };
};
