import { createSlice } from "@reduxjs/toolkit";

export const productosSlice = createSlice({
  name: "productos",
  initialState: {
    productos: [],
    detail: {},
    volver: 0,
    paginaActual: 1,
    totalPaginas: 0,
  },
  reducers: {
    allProducts: (state, action) => {
      state.productos = action.payload.productos;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
    },
    getProdById: (state, action) => {
      state.detail = { ...action.payload };
    },
    productsByName: (state, action) => {
      state.productos = action.payload.productos;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
    },
    productsByFilters: (state, action) => {
      state.productos = action.payload.productos;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
    },
    modifyVolver: (state, action) => {
      state.volver = action.payload;
    },
  },
});

export const {
  allProducts,
  productsByName,
  productsByFilters,
  modifyVolver,
  getProdById,
} = productosSlice.actions;
export default productosSlice.reducer;
