import axios from "axios";
import { allProducts, productsByName } from "./productosSlice";

// const URL_PRODUCT = "http://localhost:3001/productos";
const URL_PRODUCT = "https://karokids.onrender.com/productos";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_PRODUCT}`);
      const { elementosPaginados } = data;

      return dispatch(allProducts(elementosPaginados));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getProductsByName = (nombre) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_PRODUCT}?nombre=${nombre}`);
      const { elementosPaginados } = data;

      return dispatch(productsByName(elementosPaginados));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getProductsById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_PRODUCT}/${id}`);

      return dispatch(productsByName(data));
    } catch (error) {
      console.error(error);
    }
  };
};
