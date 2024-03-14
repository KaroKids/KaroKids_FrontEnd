import { createSlice } from "@reduxjs/toolkit";

export const ordenesSlice = createSlice({
  name: "ordenes",
  initialState: {
    ordenes: [],
    paginaActual: 1,
    totalPaginas: 0,
    filtros: {},
  },
  reducers: {
    allOrdenes: (state, action) => {
      state.ordenes = action.payload.ordenes;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
    },
    ordenesByName: (state, action) => {
      state.ordenes = action.payload.ordenes;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
    },
    ordenesByFilters: (state, action) => {
      state.ordenes = action.payload.ordenes;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
      state.filtros = action.payload.filtros;
    },
  },
});

export const { allOrdenes, ordenesByName, ordenesByFilters } =
  ordenesSlice.actions;
export default ordenesSlice.reducer;
