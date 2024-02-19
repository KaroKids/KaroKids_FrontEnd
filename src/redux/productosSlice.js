import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_PRODUCT = "http://localhost:3001/productos";

const initialState = {
  producto_id: "",
  nombre: "",
  descripcion: "",
  imagen_principal: "",
  imagenes_secundarias: [],
  video: "",
  precio: 0,
  edad: "",
  genero: "",
  destacado: false,
  inactivo: false,
  stock: {},
};

export const getProductsByName = createAsyncThunk(
  "mySlice/getProductsByName",
  async (nombre) => {
    const { data } = await axios.get(`${URL_PRODUCT}?nombre=${nombre}`);
    console.log(data);
    return data;
  }
);

export const productosSlice = createSlice({
  name: "productos",
  initialState,
  reducers: {
    productByName: (state, action) => {
      const {
        producto_id,
        nombre,
        descripcion,
        imagen_principal,
        imagenes_secundarias,
        video,
        precio,
        edad,
        genero,
        destacado,
        inactivo,
        stock,
      } = action.payload;

      state.producto_id = producto_id;
      state.nombre = nombre;
      state.descripcion = descripcion;
      state.imagen_principal = imagen_principal;
      state.imagenes_secundarias = imagenes_secundarias;
      state.video = video;
      state.precio = precio;
      state.edad = edad;
      state.genero = genero;
      state.destacado = destacado;
      state.inactivo = inactivo;
      state.stock = stock;
    },
  },
});

export const { productByName } = productosSlice.actions;
export default productosSlice.reducer;
