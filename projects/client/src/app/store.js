import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../thunk/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
