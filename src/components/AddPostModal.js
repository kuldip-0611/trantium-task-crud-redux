import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm, Controller } from 'react-hook-form';
import Form  from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { apiUrl, validation } from '../constants/constants';

const AddPostModal = ({ addPostModal, setAddPostModal ,posts , setPosts }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
     
        // Handle form submission here (e.g., call handleAdd with form values)
      
        axios.post(apiUrl.postsUrl, {
            title: data.textField2,
            body: data.textField1,          
            userId: data.numberField
          }, {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then(response => {
              const data = response.data;
              setPosts([...posts, data]);
              toast.success(validation.addPost.success);
            })
            .catch(error => {
              toast.error(validation.addPost.error);
            });
        setAddPostModal(false); // Close the modal after form submission
    };
    
    return (
        <>
            <Button variant="primary"  >
                Please Enter Data To Add Post
            </Button>

         
            <Modal show={addPostModal}>
                <Modal.Header closeButton onClick={() => setAddPostModal(false)}>
                    <Modal.Title>Add Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="numberField">
                            <Form.Label>ID</Form.Label>
                            <Controller
                                name="numberField"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Number is required' ,min: { value: 101, message: 'ID must be greater than 100' }}}
                                render={({ field }) => (
                                    <Form.Control
                                        type="number"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isInvalid={!!errors.numberField}
                                    />
                                )}
                            />
                            {errors.numberField && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.numberField.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group controlId="textField1">
                            <Form.Label>Add Body</Form.Label>
                            <Controller
                                name="textField1"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Body is required' }}
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isInvalid={!!errors.textField1}
                                    />
                                )}
                            />
                            {errors.textField1 && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.textField1.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group controlId="textField2">
                            <Form.Label>Description</Form.Label>
                            <Controller
                                name="textField2"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Description is required' }}
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isInvalid={!!errors.textField2}
                                    />
                                )}
                            />
                            {errors.textField2 && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.textField2.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setAddPostModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Upload
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddPostModal