import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register";
import Loading from "./Components/Loading/Loading";
import Note from "./Pages/Note/Note";
import Notfound from "./Components/NotFound/Notfound";
import Landingpage from "./Pages/Home/Landingpage";
import CreateNote from "./Pages/CreateNote/CreateNote";
import EditNote from "./Pages/EditNote/EditNote";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/note" element={<Note />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/editnote/:noteId" element={<EditNote />} />
        <Route path="/landingpage" element={<Landingpage />} />
      </Routes>
    </>
  );
}

export default App;
