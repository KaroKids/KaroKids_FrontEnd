import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    paginaActual: 1,
    totalPaginas: 0,
    filtros: {},
    ordenes: [],
    ordenDetail: {},
    existeReview: {},
    isFilteringActive: false,
  },
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload.users;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
    },
    UserByEmail: (state, action) => {
      state.user = action.payload;
    },
    FilteringActiveUsers: (state, action) => {
      state.isFilteringActive = action.payload;
    },
    usersByName: (state, action) => {
      state.users = action.payload.users;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
    },
    usersByFilters: (state, action) => {
      state.users = action.payload.users;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
      state.filtros = action.payload.filtros;
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
  usersByName,
  usersByFilters,
  UserPut,
  resetState,
  allOrders,
  ordenDetail,
  existeReview,
  FilteringActiveUsers
} = userSlice.actions;
export default userSlice.reducer;
