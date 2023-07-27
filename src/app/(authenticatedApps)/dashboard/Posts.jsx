"use client";

import CardCommom from "@/components/Card";
import React, { useEffect, useReducer, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AddEditPost from "../../../components/AddEditPost";
import { POST_FIELDS } from "@/helpers/constant";
import { useRouter } from "next/navigation";

const Posts = ({ data }) => {
  const [items, setItems] = useState([]);
  const [addEditPostMetadata, setAddEditPostMetadata] = useState(null);
  const router = useRouter();

  const onPostAddition = () => {
    setItems([
      {
        ...addEditPostMetadata,
        id: Date.now().toString(),
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
      ...items,
    ]);
    setAddEditPostMetadata(null);
  };

  useEffect(() => {
    setItems([...data]);
  }, [data]);

  return (
    <Container fluid>
      <AddEditPost
        title="Add Post"
        show={addEditPostMetadata}
        onClose={() => setAddEditPostMetadata(null)}
        onSave={onPostAddition}
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
              <Form.Control type="email" />
            </Form.Group>
          );
        })}
      </AddEditPost>
      <Row>
        {items.length &&
          items.map((item) => {
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
