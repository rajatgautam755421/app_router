"use client";

import { Button } from "react-bootstrap";

const error = ({ error, reset }) => {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center my-2">
      <h6>{error.message}</h6>
      <Button onClick={reset}>Refresh This</Button>
    </div>
  );
};

export default error;
