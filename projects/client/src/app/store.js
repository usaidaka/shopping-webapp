import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../thunk/authSlice";
import cartReducer from "../thunk/cartSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
