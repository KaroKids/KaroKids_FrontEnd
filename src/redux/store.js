import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productos from "./productosSlice.js";
import carrito from "./carritoSlice.js";
import users from "./userSlice.js";
import favorites from "./favoritosSlice.js";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "cartRender",
  storage,
  whitelist: ["carrito", "users"],
};

const rootReducer = combineReducers({
  productos: productos,
  carrito: carrito,
  users: users,
  favorites: favorites,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
