import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { validation } from "../constants/constants";
import { apiUrl } from "../constants/constants";

export const EditModal = ({ isOpen, setShowModal, id, posts, setPosts }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl.postsUrl}/${id}`);
        setUserData(response.data);
      } catch (error) {
        toast.error(validation.editPost.error);
      }
    };

    fetchUserData();
  }, [id]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .put(
        `${apiUrl.postsUrl}/${id}`,
        {
          title: data.title,
          body: data.description,
          userId: id,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((response) => response.data)
      .then(
        (data) => setPosts(posts.map((post) => (post.id === id ? data : post))),
        toast.success(validation.editPost.success),
        setShowModal(false)
      )
      .catch((error) => {
        toast.error(validation.editPost.error);
      });
  };

  return (
    userData !== null && (
      <div>
      {
        console.log(userData,'userData')
      }
        <Modal show={isOpen} className="bg-light">
          <Modal.Header closeButton onClick={() => setShowModal(false)}>
            <Modal.Title>Edit The Posts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Controller
                  name="title"
                  control={control}
                  defaultValue={userData.title}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      className={`border border-2 mt-2 ${
                        errors.title ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />
                {errors.title && (
                  <Form.Control.Feedback type="invalid">
                    {errors.title.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Controller
                  name="description"
                  control={control}
                  defaultValue={userData.body}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      className={`border border-2 mt-2 ${
                        errors.description ? "is-invalid" : ""
                      }`}
                    />
                  )}
                />
                {errors.description && (
                  <Form.Control.Feedback type="invalid">
                    {errors.description.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <div className="sumbit-btn mt-2">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    )
  );
};
export default EditModal;
