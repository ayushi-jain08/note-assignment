import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./Home.css";

const Landingpage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Task Creator</h1>
              <p className="subtitle">One safe place for all your task</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button className="landingbutton mr-5" size="lg">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  className="landingbutton"
                  size="lg"
                  variant="outline-primary"
                >
                  Register
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Landingpage;
