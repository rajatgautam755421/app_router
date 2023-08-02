"use client";

import AddEditPost from "@/components/AddEditPost";
import CardCommom from "@/components/Card";
import { POST_FIELDS } from "@/helpers/constant";
import { useState, useTransition } from "react";
import { Button, Form } from "react-bootstrap";

const PostInfo = ({ data, updatePost }) => {
  const [itemMetaData, setItemMetaData] = useState(null);
  const [isPending, startTransition] = useTransition();

  const onUpdate = async (e) => {
    setItemMetaData(null);
    await updatePost(e, data?.id);
  };

  return (
    <>
      {itemMetaData && (
        <AddEditPost
          show={itemMetaData}
          onClose={() => setItemMetaData(null)}
          title="Edit Post"
        >
          <Form
            action={(e) => {
              startTransition(async () => await onUpdate(e));
            }}
          >
            {POST_FIELDS.map(({ key, label }) => {
              return (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    type="text"
                    name={key}
                    defaultValue={data[key]}
                  />
                </Form.Group>
              );
            })}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </Form>
        </AddEditPost>
      )}
      <CardCommom
        title={data.title}
        description={data.description}
        image={data.image}
        buttonText={"Edit"}
        onClick={() => setItemMetaData({})}
      />
    </>
  );
};

export default PostInfo;
