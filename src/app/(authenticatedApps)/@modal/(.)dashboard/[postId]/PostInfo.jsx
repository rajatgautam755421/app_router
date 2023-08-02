"use client";

import AddEditPost from "@/components/AddEditPost";
import CardCommom from "@/components/Card";
import { POST_FIELDS } from "@/helpers/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const PostInfo = ({ data, updatePost }) => {
  const [itemMetaData, setItemMetaData] = useState(null);
  const router = useRouter();

  const onUpdate = () => {
    setItemMetaData(null);
  };

  const onClose = () => {
    router.back();
  };

  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {itemMetaData && (
            <AddEditPost
              show={itemMetaData}
              onClose={() => setItemMetaData(null)}
              title="Edit Post"
            >
              <Form
                action={async (e) => {
                  onUpdate(await updatePost(e, data?.id));
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
                <Button type="submit">Update</Button>
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostInfo;
