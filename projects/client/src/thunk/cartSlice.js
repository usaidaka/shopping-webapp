import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: "",
  },
  reducers: {
    setTotalCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTotalCart } = cartSlice.actions;

export default cartSlice.reducer;
