import axios from "axios";

import {
  allUsers,
  UserByEmail,
  UserPut,
  allOrders,
  ordenDetail,
  existeReview,
} from "./userSlice.js";

const URL_USERS = import.meta.env.VITE_URL_USERS;
const URL_ORDERS = import.meta.env.VITE_URL_ORDENES;
const URL_REVIEWS = import.meta.env.VITE_URL_REVIEWS;

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

export const getOrderById = (orden_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_ORDERS}/detail/${orden_id}`);

      console.log(data);

      const productosFiltrados = data?.productos_compra.reduce(
        (accumulator, currentItem) => {
          const { description, ...rest } = currentItem;
          const [size, color] = description && description?.split("-");
          const id = currentItem.id;

          const existingItem = accumulator.find((item) => item.id === id);
          if (existingItem) {
            if (!existingItem.producto_detalle[size]) {
              existingItem.producto_detalle[size] = {};
            }
            if (!existingItem.producto_detalle[size][color]) {
              existingItem.producto_detalle[size][color] = 0;
            }
            existingItem.producto_detalle[size][color] += Number(
              currentItem.quantity
            );
          } else {
            const newItem = { ...rest };
            newItem.producto_detalle = {
              [size]: { [color]: Number(currentItem.quantity) },
            };
            newItem.id = id;
            accumulator.push(newItem);
          }

          return accumulator;
        },
        []
      );

      const productosFixed = productosFiltrados.map((item) => {
        // Eliminar las claves 'L' y 'S' que no corresponden a tallas o colores en producto_detalle
        delete item.XS;
        delete item.S;
        delete item.M;
        delete item.L;
        delete item.XL;

        return item;
      });

      console.log(productosFiltrados);
      console.log(productosFixed);

      return dispatch(
        ordenDetail({ ...data, productos_compra: productosFixed })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const seHizoUnaReview = (usuario_id, producto_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL_REVIEWS}?usuario_id=${usuario_id}&&producto_id=${producto_id}`
      );
      console.log(data);
      return dispatch(existeReview(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createReview = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL_REVIEWS}`, body);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
