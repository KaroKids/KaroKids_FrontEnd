import axios from "axios";

import { allUsers, UserByEmail, UserPut, allOrders } from "./userSlice.js";

const URL_USERS = import.meta.env.VITE_URL_USERS;
const URL_ORDERS = import.meta.env.VITE_URL_ORDENES;

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_USERS}`);

      return dispatch(
        allUsers({
          users: data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
export const getUserByEmail = (email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL_USERS}/usuario?email_usuario=${email}`
      );

      return await dispatch(UserByEmail(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPutUser = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL_USERS}`, body);
      return await dispatch(UserPut(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// export const getAllUsersName = (nombre_usuario, apellido_usuario) => {
// 	return async (dispatch) => {
// 		try {
// 			if (nombre_usuario === undefined) nombre_usuario = "";
// 			if (apellido_usuario === undefined) apellido_usuario = "";

// 			const { data } = await axios.get(
// 				`${URL_USERS}?nombre_usuario=${nombre_usuario}&apellido_usuario=${apellido_usuario}`
// 			);
// 			return dispatch(
// 				allUsers({
// 					users: data,
// 				})
// 			);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// };

export const postUser = (body) => {
  return async () => {
    try {
      const { data } = await axios.post(`${URL_USERS}`, body);
      return dispatch(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllOrders = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_ORDERS}/${id}`);

      return dispatch(allOrders(data));
    } catch (error) {
      console.log(error);
    }
  };
};
