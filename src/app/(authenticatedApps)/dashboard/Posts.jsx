"use client";

import CardCommom from "@/components/Card";
import { POST_FIELDS } from "@/helpers/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AddEditPost from "../../../components/AddEditPost";

const Posts = ({ data, createPost }) => {
  const [addEditPostMetadata, setAddEditPostMetadata] = useState(null);
  const router = useRouter();

  const onPostAddition = () => {
    setAddEditPostMetadata(null);
    router.refresh();
  };

  return (
    <Container fluid>
      <AddEditPost
        title="Add Post"
        show={addEditPostMetadata}
        onClose={() => setAddEditPostMetadata(null)}
        onSave={() => {}}
      >
        <Form
          action={async (e) => {
            onPostAddition(await createPost(e));
          }}
        >
          {POST_FIELDS.map(({ key, label }) => {
            return (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                key={key}
                value={addEditPostMetadata?.[key]}
                onChange={(e) =>
                  setAddEditPostMetadata({
                    ...addEditPostMetadata,
                    [key]: e.target.value,
                  })
                }
              >
                <Form.Label>{label}</Form.Label>
                <Form.Control type="text" name={key} />
              </Form.Group>
            );
          })}
          <Button type="submit">Submit</Button>
        </Form>
      </AddEditPost>
      <Row>
        {data.length &&
          data.map((item) => {
            return (
              <Col md={4} className="my-2" key={item.id}>
                <CardCommom
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  buttonText={"VIEW"}
                  onClick={() => router.push(`/dashboard/${item.id}`)}
                />
              </Col>
            );
          })}
      </Row>

      <Button
        variant="danger"
        style={{ position: "fixed", right: "10px", bottom: "10px" }}
        onClick={() => setAddEditPostMetadata({})}
      >
        Add New Product
      </Button>
    </Container>
  );
};

export default Posts;
