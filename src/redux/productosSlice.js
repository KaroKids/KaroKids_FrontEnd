import { createSlice } from "@reduxjs/toolkit";

export const productosSlice = createSlice({
  name: "productos",
  initialState: {
    productos: [],
    detail: {},
  },
  reducers: {
    allProducts: (state, action) => {
      state.productos = action.payload;
    },
    getProdById: (state, action) => {
      state.detail = { ...action.payload };
    },
    productsByName: (state, action) => {
      state.productos = action.payload;
    },
  },
});

export const { allProducts, getProdById, productsByName } =
  productosSlice.actions;
export default productosSlice.reducer;
