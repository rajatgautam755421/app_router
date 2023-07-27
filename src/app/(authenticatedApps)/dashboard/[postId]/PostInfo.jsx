"use client";

import CardCommom from "@/components/Card";
import React, { useEffect, useState } from "react";

const PostInfo = ({ data }) => {
  const [item, setItem] = useState(data);

  return (
    <CardCommom
      title={item.title}
      description={item.description}
      image={item.image}
      buttonText={"Edit"}
    />
  );
};

export default PostInfo;
