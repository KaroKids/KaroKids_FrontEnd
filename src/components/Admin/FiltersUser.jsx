import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  getAllUsers,
  getUsersByFilters,
  getUsersByName,
} from "@/redux/userAction";
import { setFilteringActiveUsers } from "@/redux/userAction";

// import { useLocation } from "react-router-dom";

function FiltersUser({
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
    dispatch(setFilteringActiveUsers(true));
    dispatch(getUsersByFilters(filters));
    onClose();
  };
  const handleReset = () => {
    dispatch(setFilteringActiveUsers(false));
    dispatch(getAllUsers());
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
          <select
            name="rol"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full"
            value={filters.rol}
          >
            <option value="" defaultValue>
              ROL
            </option>
            <option value="admin">ADMIN</option>
            <option value="client">CLIENTE</option>
          </select>
          <select
            name="estado"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full"
            value={filters.estado}
          >
            <option value="" defaultValue>
              ESTADO
            </option>
            <option value="false">ACTIVO</option>
            <option value="true">INACTIVO</option>
          </select>
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

export default FiltersUser;
