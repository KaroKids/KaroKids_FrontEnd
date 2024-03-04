import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    //*Estados para usuarios no registrados
    cartLS: loadCartFromLocalStorage(),
    talla: "",

    //*Estados para usuarios registrados
    usuario_id: "",
    carrito_id: "",
    cartDB: [],
  },
  reducers: {
    //Destinadas a usuarios no registrados:
    addProductLS: (state, action) => {
      const { id, compra_color, compra_talla, quantity } = action.payload;
      const existingProductIndex = state.cartLS.findIndex(
        (product) =>
          product.id === id &&
          product.compra_color === compra_color &&
          product.compra_talla === compra_talla
      );

      if (existingProductIndex !== -1) {
        state.cartLS[existingProductIndex].quantity += quantity;
      } else {
        state.cartLS = [...state.cartLS, action.payload];
      }
      localStorage.setItem("cart", JSON.stringify(state.cartLS));
    },
    deleteProductLS: (state, action) => {
      state.cartLS = state.cartLS.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.compra_talla !== action.payload.talla ||
          item.compra_color !== action.payload.color
      );
      localStorage.setItem("cart", JSON.stringify(state.cartLS));
    },
    addTallaLS: (state, action) => {
      state.talla = action.payload;
    },
    increaseQuantityLS: (state, action) => {
      state.cartLS = state.cartLS.map((item) => {
        if (
          item.id === action.payload.id &&
          item.compra_talla === action.payload.talla &&
          item.compra_color === action.payload.color
        ) {
          return {
            ...item,
            quantity: Number(item.quantity) + 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(state.cartLS));
    },
    decreaseQuantityLS: (state, action) => {
      state.cartLS = state.cartLS.map((item) => {
        if (
          item.id === action.payload.id &&
          item.compra_talla === action.payload.talla &&
          item.compra_color === action.payload.color
        ) {
          if (item.quantity === 1) {
            return item;
          } else {
            return {
              ...item,
              quantity: Number(item.quantity) - 1,
            };
          }
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(state.cartLS));
    },
    deleteCartLS: (state, action) => {
      state.cartLS = [];
    },
    //*Destinados a usuarios registrados.
    userCartDB: (state, action) => {
      state.cartDB = action.payload;
    },
    deleteCartDB: (state, action) => {
      state.cartDB = action.payload;
    },
    addProductDB: (state, action) => {
      state.cartDB = action.payload;
    },
    deleteProductDB: (state, action) => {
      state.cartDB = action.payload;
    },
    updateProductDB: (state, action) => {
      state.cartDB = action.payload;
    },
  },
});

export const {
  //* Destinado a usuarios no registrados
  addProductLS,
  deleteProductLS,
  addTallaLS,
  decreaseQuantityLS,
  increaseQuantityLS,

  //* Destinado a usuarios registrados
  userCartDB,
  deleteCartDB,
  addProductDB,
  updateProductDB,
  deleteProductDB,
} = carritoSlice.actions;
export default carritoSlice.reducer;
