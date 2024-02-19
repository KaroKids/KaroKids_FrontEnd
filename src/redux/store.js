import { configureStore } from "@reduxjs/toolkit";
import productosReducer from "./productosSlice.js";

export default configureStore({
  reducer: {
    productos: productosReducer,
  },
});
