import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: "",
  },
  reducers: {
    setTokenAccess: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTokenAccess } = authSlice.actions;

export default authSlice.reducer;
