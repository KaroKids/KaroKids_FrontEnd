import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductsByFilters,
  modifyVolverFunc,
  setFilteringActive,
} from "@/redux/productosActions";
import { getFavorites } from "@/redux/favoritosActions";
import { Button } from "../ui/button";
import filterIcon from "/assets/images/filterIcon.svg";

import ProductCard from "./ProductCard";
import PaginationControls from "./PaginationControls";
import FilterOptions from "./FilterOptions";
import { resetStateProduct } from "@/redux/productosSlice";

const relevancias = [
  {
    id: 0,
    name: "Ordenar por",
  },
  {
    id: 1,
    name: "Menor precio",
  },
  {
    id: 2,
    name: "Mayor precio",
  },
  {
    id: 3,
    name: "A-Z",
  },
  {
    id: 4,
    name: "Z-A",
  },
];

export default function ProductList() {
  const [ordernarPor, setOrdernarPor] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filtrosAplicados, setFiltrosAplicados] = useState([]);

  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  const usuario = useSelector((state) => state.users.user);
  const favorites = useSelector((state) => state.favorites.favoritesDB);
  const loading = useSelector((state) => state.productos.loading);
  const isFilteringActive = useSelector(
    (state) => state.productos.isFilteringActive
  );

  const handleApplyFilters = (filtrosSeleccionados) => {
    setFiltrosAplicados(filtrosSeleccionados);
  };

  const handleOrdenar = (event) => {
    const nuevoOrden = parseInt(event.target.value);
    if (event.target.value === 0) {
      dispatch(setFilteringActive(false));
    } else {
      setOrdernarPor(nuevoOrden);
    }
    let edadesIguales = productos.productos.every(
      (producto) => producto.edad === productos.productos[1].edad
    );
    if (!edadesIguales && isFilteringActive) {
      setFiltrosAplicados(() => ({
        orden: nuevoOrden,
        genero: productos.productos[0].genero,
      }));
    } else if (edadesIguales && isFilteringActive) {
      setFiltrosAplicados(() => ({
        orden: nuevoOrden,
        edad: productos.productos[0].edad,
      }));
    } else {
      setFiltrosAplicados((prevFiltrosAplicados) => ({
        ...prevFiltrosAplicados,
        orden: nuevoOrden,
      }));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(resetStateProduct());
    dispatch(getFavorites(usuario.usuario_id));
    productos.volver === 0 && !isFilteringActive
      ? dispatch(getAllProducts())
      : dispatch(modifyVolverFunc(0));
    window.scroll(0, 0);
  }, [productos.volver]);

  useEffect(() => {
    if (ordernarPor !== 0) {
      dispatch(getProductsByFilters(filtrosAplicados));
    }
  }, [ordernarPor]);

  return (
    <div className="bg-white mt-20 sm:mt-0">
      {productos && (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-36 lg:py-28 lg:max-w-7xl lg:px-8">
          <h2 className="flex flex-col mb-8  text-center xl:text-left  font-medium ">
            PRODUCTOS DISPONIBLES EN KAROKIDS
          </h2>
          <div className="flex flex-row gap-x-2 justify-evenly sm:justify-end items-center  sm:space-x-4 pb-4 ">
            <select
              name="ordenarpor"
              className="border border-black hover:cursor-pointer   rounded px-5  focus:ring-black focus:border-black-500  bg-white py-3 pl-3 pr-10 text-left"
              onChange={handleOrdenar}
              value={ordernarPor}
            >
              {relevancias.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <Button
              className="flex items-center justify-center bg-white text-black  ring-1 hover:bg-sky-500  ring-black  p-6 "
              onClick={handleOpenModal}
            >
              <img src={filterIcon} alt="filter icon" className="w-4 h-6 " />
              <span className="p-2">FILTROS</span>
            </Button>
          </div>

          {loading && productos?.productos.length === 0 ? (
            <div className="h-[30vh] flex items-center justify-center text-center text-xl fold-semibold">
              <h2>No se encontraron resultados</h2>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {!loading // Corrección: Cambiado !loading por loading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div key={index} className="animate-pulse">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img className="h-auto aspect-square w-full object-cover bg-gray-300 object-center group-hover:opacity-75" />
                      </div>
                    </div>
                  ))
                : productos?.productos.map(
                    (product, i) =>
                      !product.inactivo && (
                        <ProductCard
                          key={i}
                          id={product.producto_id}
                          imageSrc={product.imagen_principal}
                          imageAlt={product.nombre}
                          name={product.nombre}
                          price={product.precio}
                          myFavorites={favorites}
                        />
                      )
                  )}
            </div>
          )}
          <PaginationControls filtros={filtrosAplicados} />
        </div>
      )}

      <FilterOptions
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApplyFilters={handleApplyFilters}
        className={`transition-transform sm:transition-opacity duration-300 ease-in-out ${isModalOpen ? "translate-x-0 md:opacity-100" : "-translate-x-full md:opacity-0 md:pointer-events-none"}`}
      />
    </div>
  );
}
