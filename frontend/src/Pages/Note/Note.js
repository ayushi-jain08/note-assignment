import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import Errormessage from "../../Components/Errormessage";
import Loading from "../../Components/Loading/Loading";
import MainScreen from "../../Components/MainScreen/MainScreen";
import { deleteFetchNote, fetchNotes } from "../../Reduxtoolkit/Noteslice";
import { toast } from "react-toastify";

const Note = () => {
  const dispatch = useDispatch();
  const Allnotes = useSelector((state) => state.note);
  const { notes, loading, error } = Allnotes;
  const users = useSelector((state) => state.user);
  const { currentUser } = users;
  const { otherDeatils } = currentUser;
  const navigate = useNavigate();
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  const deleteHandler = async (noteId) => {
    if (window.confirm("Are You Sure?")) {
      await dispatch(deleteFetchNote({ noteId }));
      await dispatch(fetchNotes());
      toast.success("Your Notes deleted Successfully");
    }
  };

  useEffect(() => {
    if (!currentUser || !storedUserInfo) {
      navigate("/landingpage");
    }
    dispatch(fetchNotes());
    // eslint-disable-next-line
  }, [dispatch]);
  console.log("mm", notes);
  const date = (updatedAt) => {
    const dateObject = new Date(updatedAt);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}   ${hours}:${minutes}`;
  };

  return (
    <>
      <Header />
      <MainScreen title={`Welcome back ${otherDeatils?.name}`}>
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Note
          </Button>
        </Link>
        {/* {deletingNote && <Loading />} */}
        {error && (
          <Errormessage variant="fdanger" value={error}>
            {error}
          </Errormessage>
        )}
        {loading ? (
          <Loading />
        ) : (
          <>
            {" "}
            {notes.length > 0 &&
              notes
                // .filter((filteredNote) =>
                //   filteredNote.title.toLowerCase().includes(search.toLowerCase())
                // )
                .map((note, i) => {
                  return (
                    <Card
                      style={{ marginBottom: "25px", marginTop: "10px" }}
                      key={i}
                    >
                      <Card.Header style={{ display: "flex" }}>
                        <span
                          style={{
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18,
                          }}
                        >
                          {note.title}
                        </span>

                        <div
                          style={{
                            display: "flex",

                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Link to={`/editnote/${note._id}`}>
                            <Button>Edit</Button>
                          </Link>
                          <Button
                            variant="danger"
                            className="mx-2"
                            onClick={() => deleteHandler(note._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <p>{note.content}</p>
                          <footer className="blockquote-footer mt-2">
                            Created on -{date(note.createdAt)}
                          </footer>
                          <footer className="blockquote-footer">
                            edited on - {date(note.updatedAt)}
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Card>
                  );
                })}
          </>
        )}
      </MainScreen>
    </>
  );
};

export default Note;
