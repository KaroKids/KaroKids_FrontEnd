import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  getAllProducts,
  getProductsByFilters,
  getProductsByName,
  setFilteringActive,
} from "@/redux/productosActions";

import coloresTailwind from "@/utils/coloresTailwind";
import { queryGlobal } from "@/redux/productosSlice";
// import { useLocation } from "react-router-dom";

function FiltersProduct({
  isOpen,
  onClose,
  onApplyFilters,
  className,
  query,
  setQuery,
  setOrder,
}) {
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  const opcionesColores = Object.entries(coloresTailwind).map(
    ([key, value]) => (
      <option key={key} value={key}>
        {value.front}
      </option>
    )
  );

  const handleApplyFilters = () => {
    const filtrosSeleccionados = filters;
    onApplyFilters(filtrosSeleccionados);
  };

  // const location = useLocation();
  // const queryParam = new URLSearchParams(location.search);
  // let nombre = queryParam.get("nombre");

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      nombre: query,
      [name]: value,
    }));
  };

  const handleFilterSubmit = () => {
    dispatch(setFilteringActive(true));
    dispatch(getProductsByFilters(filters));
    onClose();
  };
  const handleReset = () => {
    dispatch(setFilteringActive(false));
    setFilters({ genero: "", edad: "", talla: "", color: "" });
    dispatch(getAllProducts());
    dispatch(queryGlobal(""));
    setQuery("");
    setOrder(0);
    onClose();
  };

  useEffect(() => {
    handleApplyFilters(filters);
  }, [filters]);

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0 flex bg-gray-800 bg-opacity-50 z-50 transform ${className}`}
    >
      <div className="bg-white p-8 rounded-lg w-full max-w-lg lg:max-w-md xl:max-w-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">FILTROS DISPONIBLES</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <div>
            <select
              name="genero"
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full"
              value={filters.genero}
            >
              <option value="" defaultValue>
                GENEROS
              </option>
              <option value="chico">CHICO</option>
              <option value="chica">CHICA</option>
            </select>

            <select
              name="talla"
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full"
              value={filters.talla}
            >
              <option value="" defaultValue>
                TALLAS
              </option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>

            <select
              name="color"
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full"
              value={filters.color}
            >
              <option value="" defaultValue>
                COLOR
              </option>
              {opcionesColores}
            </select>

            <select
              name="edad"
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full"
              value={filters.edad}
            >
              <option value="">EDAD</option>
              <option value="recien_nacido">RECIEN NACIDO</option>
              <option value="bebe">BEBÉ</option>
              <option value="infantil">INFANTIL</option>
              <option value="junior">JUNIOR</option>
            </select>
          </div>
          <div className="flex justify-center space-x-4 pt-4">
            <button
              onClick={handleReset}
              className="bg-white-500 text-blue-500 hover:bg-blue-400 w-40 hover:text-white ring-2  px-4 py-2 rounded-lg focus:outline-none"
            >
              Limpiar
            </button>
            <button
              onClick={handleFilterSubmit}
              className="bg-blue-500 text-white px-4 py-2 ring-2 hover:bg-white hover:text-blue-500 rounded-lg w-40 focus:outline-none "
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltersProduct;
