import { handleLoginClick } from "@/actions/serverActions";
import Login from "./Login";

const Page = () => {
  return (
    <>
      <Login handleLoginClick={handleLoginClick} />
    </>
  );
};

export default Page;
