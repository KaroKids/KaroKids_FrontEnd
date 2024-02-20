import { createSlice } from "@reduxjs/toolkit";

export const productosSlice = createSlice({
  name: "productos",
  initialState: {
    productos: [],
  },
  reducers: {
    allProducts: (state, action) => {
      state.productos = action.payload;
    },
    productsByName: (state, action) => {
      state.productos = action.payload;
    },
  },
});

export const { allProducts, productsByName } = productosSlice.actions;
export default productosSlice.reducer;
