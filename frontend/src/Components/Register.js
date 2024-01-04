import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import MainScreen from "./MainScreen/MainScreen";
import Errormessage from "./Errormessage";
import Loading from "./Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../Reduxtoolkit/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [pic, setPic] = useState(null);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const { loading, error, msg } = users;
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const registerDataChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegisterData({ ...registerData, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, cpassword, password } = registerData;
    if (!name || !email || !cpassword || !password) {
      setMessage("Please fill all fields");
      return;
    }
    if (password !== cpassword) {
      setMessage("Password Do Not Match");
      return;
    }
    setMessage(null);
    await dispatch(fetchRegister({ name, email, password, pic }));
  };
  useEffect(() => {
    if (msg) {
      toast.success(msg);
      setRegisterData({
        name: "",
        email: "",
        cpassword: "",
        password: "",
      });
      setPic(null);
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [msg]);
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (storedUserInfo) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <MainScreen title="Register">
        <div className="register-container">
          {error && (
            <Errormessage variant="danger" value={message}>
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
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  onChange={registerDataChange}
                  value={registerData.name}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={registerDataChange}
                  value={registerData.email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder=" Enter Password"
                  onChange={registerDataChange}
                  value={registerData.password}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="cpassword"
                  placeholder="Enter Confirm Password"
                  onChange={registerDataChange}
                  value={registerData.cpassword}
                />
              </Form.Group>
              <Form.Group controlId="pic">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  // onChange={handleFileChange}
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={(e) => setPic(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          )}
        </div>
      </MainScreen>
    </>
  );
};

export default Register;
