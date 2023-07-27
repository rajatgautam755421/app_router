"use client";

import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { setUserCookie } from "@/helpers/general";

const Page = () => {
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState(null);
  const { user, login } = useContext(AuthContext);
  const router = useRouter();

  if (user) {
    router.push("/dashboard");
    return;
  }

  const handleLoginClick = () => {
    if (!formValues?.email || !formValues?.password) {
      setError("Fields Cannot Be Empty");
    } else if (
      formValues.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      formValues.password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setError("Either Email or password is Incorrect");
    } else {
      login("kjsdgfhdgfhgdshjghjdsghj");
      router.push("/dashboard");
    }
  };

  return (
    <>
      {error && (
        <Alert key={"danger"} variant={"danger"}>
          {error}
        </Alert>
      )}
      <h6 className="my-2 text-center">Login To Continue To Dashboard</h6>
      <Form className="w-50 mx-auto my-4">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={formValues?.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formValues?.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
        </Form.Group>
        <Button onClick={handleLoginClick}>Login</Button>
      </Form>
    </>
  );
};

export default Page;
