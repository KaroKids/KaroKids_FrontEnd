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

    //*Estados para usuarios registrados
    usuario_id: "",
    productos_compra: [], //Array que almacena los objetos del array "productos_compra" del Back.
    carrito_id: "",
    // producto_id: "",
    // compra_talla: "",
    // compra_color: "",
    // compra_cantidad: 0,
    // producto_precio: 0
    //*
  },
  reducers: {
    //*Destinados a usuarios registrados.
    allCarrito: (state, action) => {
      state.usuario_id = action.payload.usuario_id,
      state.productos_compra = action.payload.productos_compra,
      state.carrito_id = action.payload.carrito_id
    },
    agregarProducto: (state, action) => {
      state.productos_compra = action.payload.productos_compra
    },
    eliminarProducto: (state, action) => {
      state.productos_compra = action.payload.productos_compra
    },
    actualizarProducto: (state, action) => {
      state.productos_compra = action.payload.productos_compra
    },
    borrarCarrito: (state, action) => {
      state.productos_compra = action.payload.productos_compra
    },
    //*

    //Destinadas a usuarios no registrados:
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

  //* Destinado a usuarios registrados
  allCarrito,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  borrarCarrito,
  //*
} = carritoSlice.actions;
export default carritoSlice.reducer;
