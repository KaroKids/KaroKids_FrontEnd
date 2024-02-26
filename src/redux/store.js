import { configureStore } from "@reduxjs/toolkit";
import productos from "./productosSlice.js";
import carrito from "./carritoSlice.js";

export default configureStore({
  reducer: {
    productos: productos,
    carrito: carrito,
  },
});
