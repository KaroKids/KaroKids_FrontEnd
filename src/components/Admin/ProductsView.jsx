import { useEffect, useState } from "react";
import { numberMaskUnit } from "@/utils/numberMask";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductsByFilters,
  modifyVolverFunc,
} from "@/redux/productosActions";

import { Button } from "../ui/button";
import filterIcon from "/assets/images/filterIcon.svg";
import Swal from "sweetalert2";
 
import PaginationControls from "../ProductList/PaginationControls";
import FilterOptions from "../ProductList/FilterOptions";
import { Link } from "react-router-dom";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
  customClass: {
    popup: "my-toast",
  },
});

const relevancias = [
  {
    id: 0,
    name: "Ordenar por",
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


const handleLogicDelete = () =>{
  Swal.fire({
    title: "Estás seguro?",
    text: "Al confirmar el producto se pondrá inactivo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar el item!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Desactivado!",
        text: "El producto se ha desactivado con éxito.",
        icon: "success"
      });
    }
  });
}
export default function ProductList() {
 
  const [ordernarPor, setOrdernarPor] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filtrosAplicados, setFiltrosAplicados] = useState([]);

  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);

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
    productos.volver === 0
      ? dispatch(getAllProducts())
      : dispatch(modifyVolverFunc(0));
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (ordernarPor !== 0) {
      dispatch(getProductsByFilters(filtrosAplicados));
    }
  }, [ordernarPor]);

  return (
    <div className="bg-white mt-20 sm:mt-0">
      {productos && (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-36 lg:py-28 lg:max-w-7xl lg:px-8">
         <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>
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

 <div className="table w-full border-collapse">
  <div className="table-header-group bg-gray-50">
    <div className="table-row">
      <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</div>
      <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</div>
      <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</div>
      <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</div>
      <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</div>
    </div>
  </div>
  <div className="table-row-group">
    {productos &&
      productos.productos.map((product) => (
        <div key={product.producto_id} className="table-row">
          <div className="table-cell px-6 py-4 whitespace-nowrap">
            <img src={product.imagen_principal} alt={product.nombre} className="h-12 w-12 object-cover rounded" />
          </div>
          <div className="table-cell px-6 py-4 whitespace-nowrap">{product.nombre}</div>
          <div className="table-cell px-6 py-4 whitespace-nowrap max-w-12 overflow-hidden text-ellipsis">{product.descripcion}</div>
          <div className="table-cell px-6 py-4 whitespace-nowrap">$ {numberMaskUnit(product.precio)}</div>
          <div className="table-cell px-6 py-4 whitespace-nowrap">
            <Link to={`/producto/${product.producto_id}`}>
              <button className="text-indigo-600 hover:text-indigo-900 mr-2">Visualizar</button>
            </Link>
            <button  className="text-yellow-600 hover:text-indigo-900 mr-2">Editar</button>
            <button onClick={handleLogicDelete} className="text-red-600 hover:text-indigo-900 mr-2">Desactivar</button>
      
          </div>
        </div>
      ))}
  </div>
</div>

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
