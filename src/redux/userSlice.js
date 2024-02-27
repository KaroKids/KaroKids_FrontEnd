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
  },
});

export const { allUsers, UserByEmail } = userSlice.actions;
export default userSlice.reducer;
