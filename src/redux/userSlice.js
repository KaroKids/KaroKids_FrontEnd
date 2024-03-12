import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    ordenes: [],
    ordenDetail: {},
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
    resetState: () => {
      return {
        users: [],
        user: {},
      };
    },
    allOrders: (state, action) => {
      state.ordenes = action.payload;
    },
    ordenDetail: (state, action) => {
      state.ordenDetail = action.payload;
    },
  },
});

export const {
  allUsers,
  UserByEmail,
  UserPut,
  resetState,
  allOrders,
  ordenDetail,
} = userSlice.actions;
export default userSlice.reducer;
