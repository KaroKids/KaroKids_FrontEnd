import axios from "axios";

import {
	allProducts,
	productsByName,
	productsByFilters,
	modifyVolver,
	getProdById,
	allDestacados,
	FilteringActive,
	ratingByProduct,
	topCommentsByProduct,
} from "./productosSlice";

const URL_PRODUCT = import.meta.env.VITE_URL_PRODUCT;
const URL_REVIEWS = import.meta.env.VITE_URL_REVIEWS;

export const getAllProducts = (admin) => {
	return async (dispatch) => {
		try {
			if (admin === true) {
				admin = "true";
			} else {
				admin = "false";
			}
			const { data } = await axios.get(`${URL_PRODUCT}?admin=${admin}`);
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

export const getDestacados = (limite) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL_PRODUCT}/destacados`, limite);
			return dispatch(allDestacados(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const getProductsByName = (nombre, admin) => {
	return async (dispatch) => {
		try {
			if (admin === true) {
				admin = "true";
			} else {
				admin = "false";
			}
			const { data } = await axios.get(
				`${URL_PRODUCT}?nombre=${nombre}&admin=${admin}`
			);
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
			const { data } = await axios.get(`${URL_PRODUCT}/detalle/${id}`);
			return dispatch(getProdById(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const setFilteringActive = (active) => {
	return async (dispatch) => {
		try {
			return dispatch(FilteringActive(active));
		} catch (error) {
			console.log(error);
		}
	};
};

export const getProductsByFilters = (filters, admin) => {
	return async (dispatch) => {
		try {
			if (admin === true) {
				admin = "true";
			} else {
				admin = "false";
			}

			let urlFilters = "";

			if (filters.nombre === null || filters.nombre === undefined) filters.nombre = "";

			for (const [key, value] of Object.entries(filters)) {
				urlFilters += `${key}=${value}&`;
			}
			urlFilters += `admin=${admin}`;

			const { data } = await axios.get(`${URL_PRODUCT}?${urlFilters}`);
			const { elementosPaginados, totalPaginas, paginaActual } = data;

			return dispatch(
				productsByFilters({
					productos: elementosPaginados,
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

export const postProduct = (body) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${URL_PRODUCT}`, body);
			return dispatch(getProdById(response.data.producto_id));
		} catch (error) {
			console.error(error);
		}
	};
};

export const editProduct = (body) => {
	return async (dispatch) => {
		try {
			const response = await axios.put(`${URL_PRODUCT}/modificar`, body);
			return dispatch(getProdById(response.data.producto_id));
		} catch (error) {
			console.log(error);
		}
	};
};

export const productStatusChange = (body) => {
	// Activa o desactiva un producto.
	return async (dispatch) => {
		try {
			const response = await axios.put(`${URL_PRODUCT}`, body);
			return dispatch(getProdById(response.data.producto_id));
		} catch (error) {
			console.error(error);
		}
	};
};

export const productStandOutChange = (body) => {
	// Activa o desactiva el status destacado.
	return async (dispatch) => {
		try {
			const response = await axios.put(`${URL_PRODUCT}/destacado`, body);
			return dispatch(getProdById(response.data.producto_id));
		} catch (error) {
			console.error(error);
		}
	};
};

export const modifyVolverFunc = (valor) => (dispatch) => {
	dispatch(modifyVolver(valor));
};

export const getRatingByProduct = (product_id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL_REVIEWS}/${product_id}`);
			return dispatch(ratingByProduct(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const getAllCommentsByProduct = (product_id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL_REVIEWS}/all/${product_id}`);
			return dispatch(topCommentsByProduct(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const getTopCommentsByProduct = (product_id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL_REVIEWS}/ultimos/${product_id}`);
			return dispatch(topCommentsByProduct(data));
		} catch (error) {
			console.error(error);
		}
	};
};
