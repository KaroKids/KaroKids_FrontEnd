import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { useDispatch, useSelector } from "react-redux";
import { getProductsByFilters } from "@/redux/productosActions";

export default function PaginationControls({ rol }) {
  let admin = rol;
  const paginaActual = useSelector((state) => state.productos.paginaActual);
  const totalPaginas = useSelector((state) => state.productos.totalPaginas);
  const isFilteringActive = useSelector(
    (state) => state.productos.isFilteringActive
  );
  const filtros = useSelector((state) => {
    if (isFilteringActive) {
      return state.productos.filtros;
    } else {
      return {};
    }
  });
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
    dispatch(
      getProductsByFilters({ ...filtros, paginaActual: target.value }, admin)
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleAtras = () => {
    dispatch(
      getProductsByFilters(
        {
          ...filtros,
          paginaActual:
            Number(paginaActual) === 1
              ? Number(paginaActual)
              : Number(paginaActual) - 1,
        },
        admin
      )
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleAdelante = () => {
    dispatch(
      getProductsByFilters(
        {
          ...filtros,
          paginaActual:
            Number(paginaActual) < totalPaginas
              ? Number(paginaActual) + 1
              : Number(paginaActual),
        },
        admin
      )
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex mt-10 items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden items-center">
        <button
          onClick={handleAtras}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Anterior
        </button>
        <p>
          Pagina {paginaActual} de {totalPaginas}
        </p>
        <button
          onClick={handleAdelante}
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Siguiente
        </button>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-evenly">
        <div>
          <p className="text-center text-nowrap lg:pr-[900px]">
            Pagina {paginaActual} de {totalPaginas}
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
              <span className="sr-only">Anterior</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {renderPaginationsButtons()}
            <button
              onClick={handleAdelante}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Siguiente</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
