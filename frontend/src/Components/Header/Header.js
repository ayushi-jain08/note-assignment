import React from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, logout } from "../../Reduxtoolkit/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const { currentUser } = users;

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(clearError());
    navigate(`/landingpage`);
    localStorage.removeItem("userDataInfo");
  };
  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary p-1"
        bg="primary"
        variant="dark"
      >
        <Container className="padding">
          <Navbar.Brand>
            <NavLink to="/" className="text-white header">
              Task Creator
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="mr-2 search"
                  aria-label="Search"
                />
              </Form>
            </Nav>
            <Nav
              className=" my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {currentUser ? (
                <>
                  <Nav.Link as={NavLink} className="text-white font-size">
                    My Tasks
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    onClick={handleLogout}
                    className="text-white font-size"
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav>
                  <Link to="/login">Login</Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
