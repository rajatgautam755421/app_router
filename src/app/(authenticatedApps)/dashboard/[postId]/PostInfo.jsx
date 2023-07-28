"use client";

import AddEditPost from "@/components/AddEditPost";
import CardCommom from "@/components/Card";
import { POST_FIELDS } from "@/helpers/constant";
import { useState } from "react";
import { Form } from "react-bootstrap";

const PostInfo = ({ data }) => {
  const [item, setItem] = useState(data);
  const [itemMetaData, setItemMetaData] = useState(null);

  return (
    <>
      {itemMetaData && (
        <AddEditPost
          show={itemMetaData}
          onClose={() => setItemMetaData(null)}
          title="Edit Post"
        >
          {POST_FIELDS.map(({ key, label }) => {
            return (
              <Form.Group className="mb-3" key={key}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type="text"
                  value={itemMetaData[key]}
                  onChange={(e) =>
                    setItemMetaData({
                      ...itemMetaData,
                      [key]: e.target.value,
                    })
                  }
                />
              </Form.Group>
            );
          })}
        </AddEditPost>
      )}
      <CardCommom
        title={item.title}
        description={item.description}
        image={item.image}
        buttonText={"Edit"}
        onClick={() => setItemMetaData(item)}
      />
    </>
  );
};

export default PostInfo;
