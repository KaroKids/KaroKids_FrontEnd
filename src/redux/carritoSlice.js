import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    items: loadCartFromLocalStorage(),
    talla: "",
  },
  reducers: {
    addToCarrito: (state, action) => {
      state.items = [...state.items, action.payload];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeCarrito: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.producto_id !== action.payload.id ||
          item.compra_talla !== action.payload.talla ||
          item.compra_color !== action.payload.color
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
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
            compra_cantidad: Number(item.compra_cantidad) + 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(state.items));
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
              compra_cantidad: Number(item.compra_cantidad) - 1,
            };
          }
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(state.items));
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
