"use client";

import { Alert, Button } from "react-bootstrap";

const error = ({ error, reset }) => {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center my-2 w-100">
      <Alert key={"danger"} variant={"danger"}>
        {error.message}
      </Alert>
      <Button onClick={reset}>Refresh This One</Button>
    </div>
  );
};

export default error;
