import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductsByFilters,
  modifyVolverFunc,
} from "@/redux/productosActions";

import { Button } from "../ui/button";
import filterIcon from "/assets/images/filterIcon.svg";

import ProductCard from "./ProductCard";
import PaginationControls from "./PaginationControls";
import FilterOptions from "./FilterOptions";
import { Link } from "react-router-dom";


const relevancias = [
  {
    id: 0,
    name: "Ninguno",
  },
  {
    id: 1,
    name: "Precio ↑",
  },
  {
    id: 2,
    name: "Precio ↓",
  },
  {
    id: 3,
    name: "Nombre ↑",
  },
  {
    id: 4,
    name: "Nombre ↓",
  },
];

export default function ProductList() {
  const [ordernarPor, setOrdernarPor] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filtrosAplicados, setFiltrosAplicados] = useState([]);

  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  const paginaActual = useSelector((state) => state.productos.paginaActual);

  const handleApplyFilters = (filtrosSeleccionados) => {
    setFiltrosAplicados(filtrosSeleccionados);
  };

  const handleOrdenar = (event) => {
    const nuevoOrden = parseInt(event.target.value);
    setOrdernarPor(nuevoOrden);
    setFiltrosAplicados((prevFiltrosAplicados) => ({
      ...prevFiltrosAplicados,
      orden: nuevoOrden,
    }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(productos);
    productos.volver === 0
      ? dispatch(getAllProducts())
      : dispatch(modifyVolverFunc(0));
  }, []);

  useEffect(() => {
    if (ordernarPor !== 0) {
      dispatch(getProductsByFilters(filtrosAplicados));
    }
  }, [ordernarPor]);

  return (
    <div className="bg-white">
      {productos && (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="flex flex-col mb-10 font-medium ">
            PRODUCTOS DISPONIBLES EN KAROKIDS
          </h2>
          <h3>Pagina actual: {paginaActual}</h3>
          <div className="flex flex-col sm:flex-row  justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-4 ">
            <label className="mb-1 sm:mb-0" htmlFor="ordenarpor">
              ORDENAR POR:
            </label>

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
              className="flex items-center  justify-center bg-white text-black  ring-1 hover:bg-sky-500  ring-black  p-6   "
              onClick={handleOpenModal}
            >
              <img src={filterIcon} alt="filter icon" className="w-4 h-6 " />
              <span className="p-2">FILTROS</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productos &&
              productos.productos.map((product, i) => (
                <Link key={i} to={`/producto/${product.producto_id}`}>
                  <ProductCard
                    id={product.producto_id}
                    imageSrc={product.imagen_principal}
                    imageAlt={product.nombre}
                    name={product.nombre}
                    price={product.precio}
                  />
                </Link>
              ))}
          </div>
          <PaginationControls filtros={filtrosAplicados} />
        </div>
      )}

      <FilterOptions
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}
