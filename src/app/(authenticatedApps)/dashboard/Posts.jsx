"use client";

import CardCommom from "@/components/Card";
import { POST_FIELDS } from "@/helpers/constant";
import { useRouter } from "next/navigation";
import { experimental_useOptimistic, useState, useTransition } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AddEditPost from "../../../components/AddEditPost";
import { toast } from "react-hot-toast";
import { deletePost } from "@/actions/serverActions";
import { makeApiRequest } from "@/helpers/apiHelper";
import { revalidateTag } from "next/cache";

const Posts = ({ data, createPost }) => {
  const [optimisticPosts, addOptimisticPosts] = experimental_useOptimistic(
    data,
    (state, newData) => [{ ...newData }, ...state]
  );
  const [isLoading, startTransition] = useTransition();

  const [addEditPostMetadata, setAddEditPostMetadata] = useState(null);
  const router = useRouter();

  const onPostAddition = async (post) => {
    setAddEditPostMetadata(null);
    const postData = {};

    POST_FIELDS.forEach(({ key }) => {
      postData[key] = post?.get(key)?.valueOf();
    });
    addOptimisticPosts(postData);

    const { error } = await createPost(post);

    if (error) {
      return toast.error(error);
    }
  };

  const onPostDelete = async (id) => {
    startTransition(async () => {
      const { data, error } = await deletePost(id);
      if (error) {
        return toast.error(error);
      }
    });
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
          action={(e) => {
            startTransition(async () => await onPostAddition(e));
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </AddEditPost>
      <Row>
        {optimisticPosts.length &&
          optimisticPosts.map((item) => {
            return (
              <Col md={4} className="my-2" key={item.id}>
                <CardCommom
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  buttonText={"VIEW"}
                  onClick={() => router.push(`/dashboard/${item.id}`)}
                  onDelete={onPostDelete}
                  isLoading={isLoading}
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
