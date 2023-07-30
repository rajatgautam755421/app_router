"use client";

import { AuthContext } from "@/context/AuthContext";
import { setUserCookie } from "@/helpers/general";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";

const Login = ({ handleLoginClick }) => {
  const { login } = useContext(AuthContext);

  const handleLogin = (response) => {
    const { error, data } = response;

    if (error) {
      return toast.error(error);
    }

    login(data);
    setUserCookie(data);
    redirect("/dashboard");
  };
  return (
    <>
      <h6 className="my-2 text-center">Login To Continue To Dashboard</h6>
      <Form
        className="w-50 mx-auto my-4"
        action={async (e) => handleLogin(await handleLoginClick(e))}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" required />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </>
  );
};

export default Login;
