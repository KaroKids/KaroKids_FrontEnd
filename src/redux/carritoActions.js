import axios from "axios";
import {
  userCartDB,
  deleteCartDB,
  addProductDB,
  updateProductDB,
  deleteProductDB,
} from "./carritoSlice";

const URL_CARRITO = import.meta.env.VITE_URL_CARRITO;

export const getCartFromDB = (usuario_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_CARRITO}/${usuario_id}`);

      const { productos_compra } = data;

      return dispatch(userCartDB(productos_compra));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCartFromDB = (id) => {
  return async (dispatch) => {
    try {
      const { carritoUsuario } = await axios.delete(`${URL_CARRITO}/${id}`);

      const { productos_compra } = carritoUsuario;

      return dispatch(
        deleteCartDB({
          productos_compra: productos_compra,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const addProductInDB = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL_CARRITO}/agregar`, body);

      const { productos_compra } = data;

      return dispatch(addProductDB(productos_compra));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProductInDB = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL_CARRITO}/modificar`, body);

      const { productos_compra } = data;

      return dispatch(
        updateProductDB({
          productos_compra: productos_compra,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProductFromDB = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL_CARRITO}/eliminar`, body);

      console.log(data);

      const { productos_compra } = data;

      return dispatch(deleteProductDB(productos_compra));
    } catch (error) {
      console.error(error);
    }
  };
};
