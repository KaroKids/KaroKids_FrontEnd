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
        (item) =>
          item.producto_id !== action.payload.id ||
          item.compra_talla !== action.payload.talla ||
          item.compra_color !== action.payload.color
      );
    },
    addTalla: (state, action) => {
      state.talla = action.payload;
    },
    incrementarCantidad: (state, action) => {
      state.items = state.items.map((item) => {
        if (
          item.producto_id === action.payload.id &&
          item.compra_talla === action.payload.talla &&
          item.compra_color === action.payload.color
        ) {
          return {
            ...item,
            compra_cantidad: item.compra_cantidad + 1,
          };
        }
        return item;
      });
    },
    decrementarCantidad: (state, action) => {
      state.items = state.items.map((item) => {
        if (
          item.producto_id === action.payload.id &&
          item.compra_talla === action.payload.talla &&
          item.compra_color === action.payload.color
        ) {
          if (item.compra_cantidad === 1) {
            return item;
          } else {
            return {
              ...item,
              compra_cantidad: item.compra_cantidad - 1,
            };
          }
        }
        return item;
      });
    },
  },
});

export const {
  addToCarrito,
  removeCarrito,
  addTalla,
  incrementarCantidad,
  decrementarCantidad,
} = carritoSlice.actions;
export default carritoSlice.reducer;
