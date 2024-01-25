import React, { useState } from "react";
import { Button, Card, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainScreen from "../../Components/MainScreen/MainScreen";
import Errormessage from "../../Components/Errormessage";
import { createNotes } from "../../Reduxtoolkit/Noteslice";
import Loading from "../../Components/Loading/Loading";
import "./CreateNote.css";
import { toast } from "react-toastify";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.note);
  const { loading, error } = noteCreate;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!title || !content) {
        setMessage("Please fill both field");
        return;
      }
      setMessage(null);
      await dispatch(createNotes({ title, content }));
      resetHandler();
      toast.success("Your note created successfully");
      navigate("/note");
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
    setMessage(null);
  };
  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  return (
    <MainScreen title="create a task">
      {message && (
        <Errormessage variant="danger" value={message}>
          {message}
        </Errormessage>
      )}
      <Card style={{ width: "80%", margin: "20px auto" }}>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          {/*======================Title==========================*/}
          {loading ? (
            <Loading />
          ) : (
            <Form onSubmit={submitHandler} method="post" className="form-width">
              {error && (
                <Errormessage variant="danger" value={error}>
                  {error}
                </Errormessage>
              )}
              <Form.Group
                md="4"
                controlId="title"
                as={Col}
                className="form-group-width"
              >
                <Form.Label>title</Form.Label>
                <Form.Control
                  className="input-width"
                  value={title}
                  type="text"
                  placeholder="Enter title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              {/* =======================Content========================= */}
              <Form.Group
                md="4"
                controlId="content"
                as={Col}
                className="form-group-width"
              >
                <Form.Label className="mt-2">Description</Form.Label>
                <Form.Control
                  className="textarea-width"
                  as="textarea"
                  value={content}
                  placeholder="Enter content"
                  onChange={(e) => setContent(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="primary" className="m-2 mt-3">
                Create Task
              </Button>
              <Button
                className="m-2 mt-3"
                variant="danger"
                onClick={resetHandler}
              >
                Reset Fields
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
