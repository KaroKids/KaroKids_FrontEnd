import axios from "axios";
import { allFavorites, postFavorite, putFavorite } from "./favoritosSlice";

const URL_FAVORITOS = import.meta.env.VITE_URL_FAVORITES;

export const getFavorites = (usuario_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_FAVORITOS}/${usuario_id}`);

      return await dispatch(allFavorites(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addFavorite = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL_FAVORITOS}`, body);

      return dispatch(postFavorite(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFavorite = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL_FAVORITOS}`, body);

      return dispatch(putFavorite(data));
    } catch (error) {
      console.error(error);
    }
  };
};
