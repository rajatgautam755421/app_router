"use client";

import React from "react";
import { Spinner } from "react-bootstrap";

const LoaderSpinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" variant="black" size="lg" />
    </div>
  );
};

export default LoaderSpinner;
