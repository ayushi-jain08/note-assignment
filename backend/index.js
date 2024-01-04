import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import ConnectDb from "./Config/Db.js";
import fileUpload from "express-fileupload";
import user from "./Routes/User.js";
import notes from "./Routes/Notes.js";

ConnectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api/user", user);
app.use("/api/notes", notes);
//=====================Error Handling Middleware========================//
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
//====================PORT========================//
const PORT = process.env.PORT || 7000;

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
