import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
  },
  reducers: {
    userSignIn: (state, { payload }) => {
      state.userInfo = payload;
    },
    userCreate: (state, { payload }) => {
      state.userInfo = payload;
    },
    userSignOut: (state, { payload }) => {
      state.userInfo = {};
    },
    userUpdate: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userSignIn, userSignOut,userUpdate,userCreate } = authSlice.actions;

export default authSlice.reducer;
