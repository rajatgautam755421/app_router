"use client";

import React from "react";
import { Spinner } from "react-bootstrap";

const loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Spinner size="lg" />
    </div>
  );
};

export default loading;
