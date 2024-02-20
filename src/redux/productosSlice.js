import { createSlice } from "@reduxjs/toolkit";

export const productosSlice = createSlice({
  name: "productos",
  initialState: {
    productos: [],
    volver: 0,
  },
  reducers: {
    allProducts: (state, action) => {
      state.productos = action.payload;
    },
    productsByName: (state, action) => {
      state.productos = action.payload;
    },
    productsByFilters: (state, action) => {
      state.productos = action.payload;
    },
    modifyVolver: (state, action) => {
      state.volver = action.payload;
    },
  },
});

export const { allProducts, productsByName, productsByFilters, modifyVolver } =
  productosSlice.actions;
export default productosSlice.reducer;
