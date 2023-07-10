import { createSlice } from "@reduxjs/toolkit";

export const countCartSlice = createSlice({
  name: "countCart",
  initialState: {
    value: 0,
    details: [],
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setCountCart: (state, action) => {
      state.value = action.payload;
    },
    setDetails: (state, action) => {
      const index = state.details.findIndex(
        (x) => x.product_id === action.payload.product_id
      );
      if (index !== -1) {
        state.details[index].qty = action.payload.qty;
      } else {
        state.details.push(action.payload);
      }

      state.value = state.details.reduce((i, detail) => i + detail.qty, 0);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCountCart, increment, decrement, setDetails } =
  countCartSlice.actions;

export default countCartSlice.reducer;
