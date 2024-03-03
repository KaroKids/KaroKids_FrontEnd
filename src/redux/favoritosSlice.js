import { createSlice } from "@reduxjs/toolkit";

const favoritosSlice = createSlice({
  name: "favorites",
  initialState: {
    //*Estados para usuarios registrados
    usuario_id: "",
    favoritesDB: [],
  },
  reducers: {
    //*Destinados a usuarios registrados.
    allFavorites: (state, action) => {
      state.favoritesDB = action.payload;
    },
    postFavorite: (state, action) => {
      state.favoritesDB = action.payload;
    },
    putFavorite: (state, action) => {
      state.favoritesDB = action.payload;
    },
    resetState: () => {
      return {
        usuario_id: "",
        favoritesDB: [],
      };
    },
  },
});

export const {
  //* Destinado a usuarios registrados
  allFavorites,
  postFavorite,
  putFavorite,
} = favoritosSlice.actions;

export default favoritosSlice.reducer;
