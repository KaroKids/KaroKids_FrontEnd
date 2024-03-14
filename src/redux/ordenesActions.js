import axios from "axios";

import { allOrdenes, ordenesByName, ordenesByFilters, getOrdById } from "./ordenesSlice";

const URL_ORDENES = import.meta.env.VITE_URL_ORDENES;

export const getAllOrdenes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_ORDENES}`);
      const { elementosPaginados, totalPaginas, paginaActual } = data;

      return dispatch(
        allOrdenes({
          ordenes: elementosPaginados,
          totalPaginas,
          paginaActual,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const OrdenesStatusChange = (body) => {
  // Activa o desactiva un producto.
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL_ORDENES}`, body);
      return dispatch(getOrdById(response.data.orden_id));
    } catch (error) {
      console.error(error);
    }
  };
};


export const getOrdenesByName = (nombre) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_ORDENES}?nombre=${nombre}`);
      const { elementosPaginados, totalPaginas, paginaActual } = data;
      return dispatch(
        ordenesByName({
          ordenes: elementosPaginados,
          totalPaginas,
          paginaActual,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};
export const getOrdenesByFilters = (filters) => {
  return async (dispatch) => {
    try {
      let urlFilters = "";

      if (filters.nombre === null) filters.nombre = "";

      for (const [key, value] of Object.entries(filters)) {
        urlFilters += `${key}=${value}&`;
      }

      const { data } = await axios.get(`${URL_ORDENES}?${urlFilters}`);
      const { elementosPaginados, totalPaginas, paginaActual } = data;
      return dispatch(
        ordenesByFilters({
          ordenes: elementosPaginados,
          totalPaginas,
          paginaActual,
          filtros: filters,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};
