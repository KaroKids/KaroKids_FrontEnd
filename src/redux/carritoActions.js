import axios from "axios";
import {
  allCarrito,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  borrarCarrito,
} from "./carritoSlice";

const URL_CARRITO = import.meta.env.VITE_URL_CARRITO; //No sé cómo está definida, pero la ruta en el back es 'carritos/'

export const getCarrito = async (usuario_id) => {
  return async (dispatch) => {
    try {
      const { carritoUsuario } = await axios.get(
        `${URL_CARRITO}/${usuario_id}`
      );

      const { productos_compra } = carritoUsuario;

      return dispatch(
        allCarrito({
          productos_compra,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const addProducto = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL_CARRITO}/agregar`, body);
      console.log(response);
      return dispatch(agregarProducto(response.data.producto_id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProducto = async (body) => {
  return async (dispatch) => {
    try {
      const { carritoUsuario } = await axios.put(`${URL_CARRITO}`, body);

      const { productos_compra } = carritoUsuario;

      return dispatch(
        eliminarProducto({
          productos_compra: productos_compra,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProducto = async (body) => {
  return async (dispatch) => {
    try {
      const { carritoUsuario } = await axios.put(`${URL_CARRITO}`, body);

      const { productos_compra } = carritoUsuario;

      return dispatch(
        actualizarProducto({
          productos_compra: productos_compra,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCarrito = async (id) => {
  return async (dispatch) => {
    try {
      const { carritoUsuario } = await axios.delete(`${URL_CARRITO}/${id}`);

      const { productos_compra } = carritoUsuario;

      return dispatch(
        borrarCarrito({
          productos_compra: productos_compra,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};
