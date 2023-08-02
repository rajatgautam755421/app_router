import Skeleton from "@/components/Skeleton";
import Spinner from "@/components/LoaderSpinner";
import React from "react";
import LoaderSpinner from "@/components/LoaderSpinner";

const loading = () => {
  return (
    <div
      style={{ position: "absolute", top: "50%", right: "50%", zIndex: 999 }}
    >
      <LoaderSpinner />
    </div>
  );
};

export default loading;
