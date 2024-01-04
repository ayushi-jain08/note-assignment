import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import MainScreen from "../MainScreen/MainScreen";
import Errormessage from "../Errormessage";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchLogin } from "../../Reduxtoolkit/UserSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Login = () => {
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const { loading, error } = users;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    await dispatch(fetchLogin({ email, password }));
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (storedUserInfo) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/note");
      }, 1000);
    }
  };
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (storedUserInfo) {
      navigate("/note");
    }
  }, [navigate]);
  return (
    <>
      <MainScreen title="Login">
        <div className="login-container">
          {showSuccess && (
            <Alert
              severity="success"
              style={{ backgroundColor: "#c2f0c2", width: "300px" }}
            >
              "You successfully login"
            </Alert>
          )}
          {error && (
            <Errormessage variant="danger" value={error}>
              {error}
            </Errormessage>
          )}
          {message && (
            <Errormessage variant="danger" value={message}>
              {message}
            </Errormessage>
          )}
          {loading ? (
            <Loading />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </div>
      </MainScreen>
    </>
  );
};

export default Login;
