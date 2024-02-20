import { configureStore } from "@reduxjs/toolkit";
import productos from "./productosSlice.js";

export default configureStore({
  reducer: {
    productos: productos,
  },
});
