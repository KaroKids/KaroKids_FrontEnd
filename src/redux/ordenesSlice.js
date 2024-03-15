import { createSlice } from "@reduxjs/toolkit";

export const ordenesSlice = createSlice({
  name: "ordenes",
  initialState: {
    ordenes: [],
    paginaActual: 1,
    totalPaginas: 0,
    filtros: {},
    detail: {},
    isFilteringActive: false,
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
    getOrdById: (state, action) => {
      state.detail = { ...action.payload };
    },
    FilteringActiveOrdenes: (state, action) => {
      state.isFilteringActive = action.payload;
    },
  },
});

export const { allOrdenes, ordenesByName, ordenesByFilters, getOrdById, FilteringActiveOrdenes } =
  ordenesSlice.actions;
export default ordenesSlice.reducer;
