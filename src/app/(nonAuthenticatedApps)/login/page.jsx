import { makeApiRequest } from "@/helpers/apiHelper";
import Login from "./Login";

async function handleLoginClick(userValues) {
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

  if (error) {
    return { error };
  }

  return { data };
}

const Page = () => {
  return (
    <>
      <Login handleLoginClick={handleLoginClick} />
    </>
  );
};

export default Page;
