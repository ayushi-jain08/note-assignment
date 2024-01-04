import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const HOST = "https://note-assignment.onrender.com";
//====================REGISTER USER=======================//
export const fetchRegister = createAsyncThunk(
  "data/fetchRegister",
  async ({ name, email, password, pic }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("img", pic);
    try {
      const response = await fetch(`${HOST}/api/user/register`, {
        method: "POST",
        mode: "cors",
        "Content-Type": "multipart/form-data",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// ===================USER LOGIN===================
export const fetchLogin = createAsyncThunk(
  "data/fetchLogin",
  async ({ email, password }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await fetch(`${HOST}/api/user/login`, {
        method: "POST",
        mode: "cors",
        "Content-Type": "multipart/form-data",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userDataInfo", JSON.stringify(data.users));
        return data.users;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===========LOGOUT============
export const logout = createAsyncThunk("data/logout", async () => {
  localStorage.removeItem("userInfo");

  return null;
});
const infoStorage = () => {
  const StorageUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  if (StorageUserInfo) {
    return StorageUserInfo;
  }
  return null;
};
const initialState = {
  currentUser: infoStorage() || {},
  loading: false,
  error: null,
  msg: "",
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.msg;
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem("userDataInfo", JSON.stringify(action.payload));
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = "";
        state.loggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { clearError } = UserSlice.actions;
export default UserSlice.reducer;
