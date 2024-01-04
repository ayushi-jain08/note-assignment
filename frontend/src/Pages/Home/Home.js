import React from "react";
import { useSelector } from "react-redux";
import Note from "../Note/Note";
import Landingpage from "./Landingpage";

const Home = () => {
  const users = useSelector((state) => state.user);
  const { currentUser } = users;

  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));

  return <>{currentUser && storedUserInfo ? <Note /> : <Landingpage />}</>;
};

export default Home;
