import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import Noteslice from "./Noteslice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    note: Noteslice,
  },
});
export default store;
