import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, modifyVolverFunc } from "@/redux/productosActions";

import { Button } from "../ui/button";
import filterIcon from "/assets/images/filterIcon.svg";

import ProductCard from "./ProductCard";
import PaginationControls from "./PaginationControls";
import FilterOptions from "./FilterOptions";
import { Link } from "react-router-dom";

const relevancias = [
  {
    id: 1,
    name: "Relevancia 1",
  },
  {
    id: 2,
    name: "Relevancia 2",
  },
  {
    id: 3,
    name: "Relevancia 3",
  },
  {
    id: 4,
    name: "Relevancia 4",
  },
  {
    id: 5,
    name: "Relevancia 5",
  },
  {
    id: 6,
    name: "Relevancia 6",
  },
  {
    id: 7,
    name: "Relevancia 7",
  },
  {
    id: 8,
    name: "Relevancia 8",
  },
  {
    id: 9,
    name: "Relevancia 9",
  },
  {
    id: 10,
    name: "Relevancia 10",
  },
];

export default function ProductList() {
  const [ordernarPor, setOrdernarPor] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    productos.volver === 0
      ? dispatch(getAllProducts())
      : dispatch(modifyVolverFunc(0));
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="flex flex-col mb-10 font-medium ">
          PRODUCTOS DISPONIBLES EN KAROKIDS
        </h2>

        <div className="flex flex-col sm:flex-row  justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-4 ">
          <label className="mb-1 sm:mb-0" htmlFor="ordenarpor">
            ORDENAR POR:
          </label>

          <select
            name="ordenarpor"
            className="border border-black hover:cursor-pointer   rounded px-5  focus:ring-black focus:border-black-500  bg-white py-3 pl-3 pr-10 text-left"
            onChange={setOrdernarPor}
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

        <PaginationControls />
      </div>

      <FilterOptions isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
