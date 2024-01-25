import React, { useEffect, useState } from "react";
import "./EditNote.css";
import { Button, Card, Form, Col } from "react-bootstrap";
import MainScreen from "../../Components/MainScreen/MainScreen";
import Errormessage from "../../Components/Errormessage";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { FetchSingleNote, updateFetchNote } from "../../Reduxtoolkit/Noteslice";
import { toast } from "react-toastify";

const EditNote = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);
  const noteCreate = useSelector((state) => state.note);
  const { loading, error, singleNote } = noteCreate;
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!title || !content) {
        setMessage("Please fill both field");
        return;
      }
      setMessage(null);
      await dispatch(updateFetchNote({ noteId, title, content }));
      toast.success("Your note is updated successfully");
      navigate("/note");
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
    setMessage(null);
  };
  useEffect(() => {
    if (noteId) {
      dispatch(FetchSingleNote(noteId));
    }
  }, [dispatch, noteId]);
  // Set initial state when singleJobDetail is available
  useEffect(() => {
    if (!singleNote) {
      // Handle the case where no note is found
      setMessage("No such note found");
      return;
    }
    if (singleNote !== "") {
      setTitle(singleNote?.title || "");
      setContent(singleNote?.content || "");
    }
    // eslint-disable-next-line
  }, [dispatch, singleNote]);

  return (
    <MainScreen title="Edit a task">
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
                Edit Task
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default EditNote;
