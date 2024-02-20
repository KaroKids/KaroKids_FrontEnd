import axios from "axios";

import {
  allProducts,
  productsByName,
  productsByFilters,
  modifyVolver,
  getProdById,
} from "./productosSlice";

// const URL_PRODUCT = "http://localhost:3001/productos";
const URL_PRODUCT = "https://karokids.onrender.com/productos";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_PRODUCT}`);
      const { elementosPaginados, totalPaginas, paginaActual } = data;

      return dispatch(
        allProducts({
          productos: elementosPaginados,
          totalPaginas,
          paginaActual,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};
export const getProductsByName = (nombre) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_PRODUCT}?nombre=${nombre}`);
      const { elementosPaginados, totalPaginas, paginaActual } = data;

      return dispatch(
        productsByName({
          productos: elementosPaginados,
          totalPaginas,
          paginaActual,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};
export const getProductsById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_PRODUCT}/${id}`);
      return dispatch(getProdById(data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getProductsByFilters = (filters) => {
  return async (dispatch) => {
    try {
      let urlFilters = "";

      if (filters.nombre === null) filters.nombre = "";

      for (const [key, value] of Object.entries(filters)) {
        urlFilters += `${key}=${value}&`;
      }

      const { data } = await axios.get(`${URL_PRODUCT}?${urlFilters}`);
      const { elementosPaginados, totalPaginas, paginaActual } = data;

      return dispatch(
        productsByFilters({
          productos: elementosPaginados,
          totalPaginas,
          paginaActual,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const modifyVolverFunc = (valor) => (dispatch) => {
  dispatch(modifyVolver(valor));
};
