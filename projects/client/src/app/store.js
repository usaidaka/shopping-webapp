import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../thunk/authSlice";
import cartReducer from "../thunk/cartSlice";
import countCartReducer from "../thunk/countCartSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    countCart: countCartReducer,
  },
});
