import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    ordenes: [],
    ordenDetail: {},
    existeReview: {},
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
    existeReview: (state, action) => {
      state.existeReview = action.payload;
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
  existeReview,
} = userSlice.actions;
export default userSlice.reducer;
