import { createSlice } from "@reduxjs/toolkit";

export const productosSlice = createSlice({
  name: "productos",
  initialState: {
    productos: [],
    destacados: [],
    detail: {},
    volver: 0,
    paginaActual: 1,
    totalPaginas: 0,
    isFilteringActive: false,
    filtros: {},
    rating: [],
    comments: [],
    queryGlobal: "",
  },
  reducers: {
    allProducts: (state, action) => {
      state.productos = action.payload.productos;
      state.paginaActual = action.payload.paginaActual;
      state.totalPaginas = action.payload.totalPaginas;
      state.loading = true;
    },
    allDestacados: (state, action) => {
      state.destacados = action.payload;
    },
    FilteringActive: (state, action) => {
      state.isFilteringActive = action.payload;
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
      state.filtros = action.payload.filtros;
    },
    modifyVolver: (state, action) => {
      (state.volver = action.payload), (state.loading = true);
    },
    resetStateProduct: (state) => {
      return {
        ...state,
        detail: {},
      };
    },
    resetFiltering: (state) => {
      return {
        ...state,
        isFilteringActive: false,
      };
    },
    ratingByProduct: (state, action) => {
      state.rating = action.payload;
    },
    topCommentsByProduct: (state, action) => {
      state.comments = action.payload;
    },
    queryGlobal: (state,action) => {
      state.queryGlobal = action.payload;
    }
  },
});

export const {
  allProducts,
  productsByName,
  productsByFilters,
  modifyVolver,
  getProdById,
  resetStateProduct,
  allDestacados,
  FilteringActive,
  resetFiltering,
  ratingByProduct,
  topCommentsByProduct,
  queryGlobal,
} = productosSlice.actions;
export default productosSlice.reducer;
