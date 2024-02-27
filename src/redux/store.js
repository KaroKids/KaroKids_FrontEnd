import { configureStore } from "@reduxjs/toolkit";
import productos from "./productosSlice.js";
import carrito from "./carritoSlice.js";
import users from "./userSlice.js";

export default configureStore({
	reducer: {
		productos: productos,
		carrito: carrito,
		users: users,
	},
});
