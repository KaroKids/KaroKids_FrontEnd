import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
  },
  reducers: {
    allUsers: (state, { payload }) => {
      state.users = [...state.users, payload];
    },
    UserByEmail: (state, action) => {
      state.user = action.payload;
    },
    UserPut: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { allUsers, UserByEmail, UserPut } = userSlice.actions;
export default userSlice.reducer;
