"use client";

import { deletePost, fetchPosts } from "@/actions/serverActions";
import CardCommom from "@/components/Card";
import { POST_FIELDS } from "@/helpers/constant";
import { useRouter } from "next/navigation";
import {
  experimental_useOptimistic,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";
import AddEditPost from "../../../components/AddEditPost";
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = ({ data, createPost }) => {
  const [optimisticPosts, addOptimisticPosts] = experimental_useOptimistic(
    data,
    (state, newData) => [
      !Array.isArray(newData) ? { ...newData } : [...newData],
      ...state,
    ]
  );

  const [items, setItems] = useState([...data]);
  const [isLoading, startAddTransition] = useTransition();
  const [isLoadingDeletion, startDeleteTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(11);
  const [hasMore, setHasMore] = useState(true);

  const [addEditPostMetadata, setAddEditPostMetadata] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setItems([...data]);
  }, [data]);

  const onPostAddition = async (post) => {
    setAddEditPostMetadata(null);
    const postData = {};

    POST_FIELDS.forEach(({ key }) => {
      postData[key] = post?.get(key)?.valueOf();
    });
    addOptimisticPosts({
      ...postData,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    });

    startAddTransition(async () => {
      const { data, error } = await createPost(post);
      if (error) {
        return toast.error(error);
      }
      toast.success("Successfully Added");
    });
  };

  const onPostDelete = async (id) => {
    startDeleteTransition(async () => {
      const { data, error } = await deletePost(id);
      if (error) {
        return toast.error(error);
      }

      router.refresh();

      toast.success("Successfully Deleted");
    });
  };

  const fetchMoreData = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchPosts(currentPage * 10);

      if (error) {
        return toast.error(error);
      }

      if (!data.length) {
        setHasMore(false);
        return;
      }

      if (data && data.length) {
        setItems([...items, ...data]);
      }
    };

    fetchData();
  }, [currentPage]);

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
            await onPostAddition(e);
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
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="my-2 d-flex justify-content-center align-items-center">
            <Spinner />
          </div>
        }
      >
        <Row>
          {items.length &&
            items.map((item) => {
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
                    isLoading={isLoadingDeletion}
                  />
                </Col>
              );
            })}
        </Row>
      </InfiniteScroll>

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
