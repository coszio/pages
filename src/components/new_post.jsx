import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "@reach/router";
import { path } from "./../connections";

export default function NewPost() {
  const [show, setShow] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [inputs, setInputs] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showError = () => {
    setModalHeading("Error");
    setModalMessage("Something went wrong");
    handleShow();
  };

  const showSuccess = () => {
    setModalHeading("Success");
    setModalMessage("Post created successfully");
    handleShow();
  };

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit clicked");
    const response = await fetch(path + "/posts", {
      method: "PUT",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    response && response.status === 201 ? showSuccess() : showError();
  };

  return (
    <div className='container pt-5 '>
      <div className='d-grid'>
        <div className='row mt-3'>
          <div class='col-md' />
          <div class='col-md-6'>
            <Link to='/'>
              <Button>Back to posts</Button>
            </Link>
            <h1 class='container'>New Post</h1>
            <form class='d-grid gap-3 px-5' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  placeholder='Enter Title'
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='username'>Author</label>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  placeholder='Enter Username'
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='content'>Content</label>
                <textarea
                  type='text'
                  className='form-control'
                  id='content'
                  placeholder='Enter Content'
                  onChange={handleChange}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{modalHeading}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalMessage}</Modal.Body>
              <Modal.Footer>
                <Link to='/'>
                  <Button variant='secondary' onClick={handleClose}>
                    Go to Posts
                  </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
          <div class='col-md' />
        </div>
      </div>
    </div>
  );
}
