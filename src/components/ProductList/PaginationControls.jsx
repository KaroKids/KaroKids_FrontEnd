import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { useDispatch, useSelector } from "react-redux";
import { getProductsByFilters } from "@/redux/productosActions";
import { useState, useEffect } from "react";

// esto es para tener una copia de los filtros

// const [filtrosAplicados, setFiltrosAplicados] = useState([]);
//esto es para que se copien los filtros del filteroption
// const handleApplyFilters = (filtrosSeleccionados) => {
//   setFiltrosAplicados(filtrosSeleccionados);
// };
// const [nuevaPagina, setNuevaPagina] = useState(1);
// al hacer click en un boton de pagina se actualiza el contenedor de los filtros
// const handlePagina = (event) =>{
//   setNuevaPagina(event.target.value);
//   setFiltrosAplicados((prevFiltrosAplicados) => ({
//     ...prevFiltrosAplicados,
//     pagicaActual: nuevaPagina
//   }));
// }
//al modificarse el estado de la pagina se llama al filtrar con todos los filtros mas el de la pagina actual
// useEffect(() => {
//   dispatch(getProductsByFilters(filtrosAplicados));
// }, [nuevaPagina]);

//al hacer click en una pagina se llama al filtrar con el valor de la pagina, va al handler, actualiza y al actualizar se dispachea el filtrar con todos los filtros es practicamente como el ordenar.
//en el paginationcontrol de producttlis habria que pasar esto por parametro onApplyFilters={handleApplyFilters}

///////////////////////////

export default function PaginationControls({ filtros }) {
  const paginaActual = useSelector((state) => state.productos.paginaActual);
  const totalPaginas = useSelector((state) => state.productos.totalPaginas);
  const dispatch = useDispatch();

  const renderPaginationsButtons = () => {
    const buttons = [];

    for (let i = 1; i < totalPaginas + 1; i++) {
      buttons.push(
        <button
          key={i}
          aria-current="page"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          value={i}
          onClick={handlePagination}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  const handlePagination = ({ target }) => {
    dispatch(getProductsByFilters({ ...filtros, paginaActual: target.value }));
  };
  const handleAtras = () => {
    dispatch(
      getProductsByFilters({ ...filtros, paginaActual: paginaActual - 1 })
    );
  };
  const handleAdelante = () => {
    dispatch(
      getProductsByFilters({ ...filtros, paginaActual: paginaActual + 1 })
    );
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">12</span> de{" "}
            <span className="font-medium">97</span> resultados
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={handleAtras}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {renderPaginationsButtons()}
            <button
              onClick={handleAdelante}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
