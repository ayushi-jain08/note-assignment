import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const HOST = "https://note-assignment.onrender.com";
// =====================FETCH NOTES===========================
export const fetchNotes = createAsyncThunk(
  "data/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/notes/get`, {
        headers: {
          "Content-Type": "application/json", // Fix the header syntax
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        mode: "cors",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// ===================CREATE NOTES=========================
export const createNotes = createAsyncThunk(
  "data/createNotes",
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/notes/create`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Fix the header syntax
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data.createdNote;
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// ===================DELETE NOTE=======================
export const deleteFetchNote = createAsyncThunk(
  "data/deleteFetchNote",
  async ({ noteId }, { _, rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/notes/deletenote/${noteId}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      if (response.ok) {
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// =====================UPDATE NOTE=========================
export const updateFetchNote = createAsyncThunk(
  "data/updateFetchNote",
  async ({ noteId, title, content }, { rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/notes/updatenote/${noteId}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
//===========================FETCH SINGLE NOTE========================
export const FetchSingleNote = createAsyncThunk(
  "data/ FetchSingleNote ",
  async ({ noteId }, { _, rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/notes/getnotebyid/${noteId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const addCompletedTask = createAsyncThunk(
  "data/addCompletedTask",
  async ({ taskId }, { rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/notes/${taskId}/complete`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error("Failed to add completed task");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  notes: [],
  singleNote: "",
  loading: false,
  error: null,
};

const Noteslice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
        state.error = null;
      })
      .addCase(createNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFetchNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFetchNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteFetchNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFetchNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFetchNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateFetchNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchSingleNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchSingleNote.fulfilled, (state, action) => {
        state.loading = false;
        state.singleNote = action.payload;
        state.error = null;
      })
      .addCase(FetchSingleNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCompletedTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCompletedTask.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addCompletedTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default Noteslice.reducer;
