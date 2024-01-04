import React from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, logout } from "../../Reduxtoolkit/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const { currentUser } = users;
  const { otherDeatils } = currentUser;
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
              Note Zipper
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
                  <Nav.Link
                    as={NavLink}
                    to="/note"
                    className="text-white font-size"
                  >
                    My Notes
                  </Nav.Link>
                  <NavDropdown
                    title={otherDeatils?.name}
                    className="font-size"
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item>
                      <Link to="/profile">My profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
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
