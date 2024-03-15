import axios from "axios";

import {
	allOrdenes,
	ordenesByName,
	ordenesByFilters,
	getOrdById,
} from "./ordenesSlice";

const URL_ORDENES = import.meta.env.VITE_URL_ORDENES;
const URL_CARRITO = import.meta.env.VITE_URL_CARRITO;

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

export const postOrden = (body) =>{
  return async (dispatch) =>{
    try{
    const response = await axios.post(`${URL_ORDENES}`, body)
    const response2 = await axios.put(`${URL_CARRITO}/resetear`, body)
  return(response)
}catch(error){
  console.log(error)
}
}
}

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
export const getOrderById = (orden_id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL_ORDENES}/detail/${orden_id}`);

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

			return dispatch(
				getOrdById({ ...data, productos_compra: productosFixed })
			);
		} catch (error) {
			console.log(error);
		}
	};
};
