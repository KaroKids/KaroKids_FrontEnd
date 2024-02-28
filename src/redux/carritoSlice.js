import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    items: loadCartFromLocalStorage(),
    carrito: [],
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
      state.carrito = action.payload;
    },
    agregarProducto: (state, action) => {
      console.log("action.payload: " + action.payload)
      state.productos_compra = action.payload;
    },
    eliminarProducto: (state, action) => {
      console.log("action.payload: " + action.payload)
      state.productos_compra = action.payload;
    },
    actualizarProducto: (state, action) => {
      state.productos_compra = action.payload;
    },
    borrarCarrito: (state, action) => {
      state.productos_compra = action.payload;
    },
    //*

    //Destinadas a usuarios no registrados:
    addToCarrito: (state, action) => {
      state.items = [...state.items, action.payload];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeCarrito: (state, action) => {
      console.log("aca si entra")
      state.items = state.items.filter(
        (item) =>
          item.producto_id !== action.payload.producto_id ||
          item.compra_talla !== action.payload.compra_talla ||
          item.compra_color !== action.payload.compra_color
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
