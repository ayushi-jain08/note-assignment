import express from "express";
import { auth } from "../Utils/Auth.js";
import {
  CreateNote,
  DeleteNote,
  GetAllNotes,
  GetNoteById,
  UpdateNote,
} from "../Controller/Notes.js";
const router = express.Router();

router.post("/create", auth, CreateNote);
router.get("/get", auth, GetAllNotes);
router.get("/getnotebyid/:noteId", auth, GetNoteById);
router.patch("/updatenote/:noteId", auth, UpdateNote);
router.delete("/deletenote/:noteId", auth, DeleteNote);
export default router;
