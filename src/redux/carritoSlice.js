import { createSlice } from "@reduxjs/toolkit";

const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    items: [],
    talla: "",
  },
  reducers: {
    addToCarrito: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeCarrito: (state, action) => {
      state.items = state.items.filter(
        (item) => item.producto_id !== action.payload
      );
    },
    addTalla: (state, action) => {
      state.talla = action.payload;
    },
  },
});

export const { addToCarrito, removeCarrito, addTalla } = carritoSlice.actions;
export default carritoSlice.reducer;
