import Note from "../Model/Notes.js";
import { errorHandler } from "../Utils/Error.js";

export const CreateNote = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return next(errorHandler(400, "Please Fill all the Details"));
    } else {
      const note = new Note({ user: req.user._id, title, content });

      const createdNote = await note.save();
      res.status(200).json({ createdNote });
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const GetAllNotes = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const notes = await Note.find({ user: _id });

    if (!notes) {
      return next(errorHandler(400, "Notes not found"));
    } else {
      res.status(200).json(notes);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const GetNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return next(errorHandler(400, "Notes not found"));
    } else {
      res.status(200).json(note);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const UpdateNote = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const { title, content } = req.body;

    const note = await Note.findById(noteId);
    if (!note) {
      return next(errorHandler(400, "Notes not found"));
    } else {
      if (note.user.toString() !== req.user._id.toString()) {
        next(errorHandler(401, "you can't perform this action"));
      }
      if (title) {
        note.title = title;
      }
      if (content) {
        note.content = content;
      }

      const updatedNote = await note.save();
      res.status(200).json(updatedNote);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};
export const DeleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  console.log(noteId);
  try {
    const note = await Note.findById(noteId);

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401).json({
        success: "you can't perform this action",
      });
    }
    if (!note) {
      return next(errorHandler(400, "Notes not found"));
    }
    await note.deleteOne();
    res.status(200).json({
      message: "Note Removed",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
