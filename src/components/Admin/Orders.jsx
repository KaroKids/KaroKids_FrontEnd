import { useEffect, useState } from "react";
import { numberMask } from "@/utils/numberMask";
import Swal from "sweetalert2";
import OrderPagination from "./OrderPagination";
import filterIcon from "/assets/images/filterIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  OrdenesStatusChange,
  getAllOrdenes,
  getOrdenesByFilters,
  getOrdenesByName,
  setFilteringActiveOrdenes,
} from "@/redux/ordenesActions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FiltersOrder from "./FiltersOrder";
import { Link } from "react-router-dom";

export default function Orders() {
  const dispatch = useDispatch();
  const ordenes = useSelector((state) => state.ordenes.ordenes);
  const [query, setQuery] = useState("");

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
  const [ordernarPor, setOrdernarPor] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtrosAplicados, setFiltrosAplicados] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilters = (filtrosSeleccionados) => {
    setFiltrosAplicados(filtrosSeleccionados);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (query.length > 0) {
        dispatch(getOrdenesByFilters({ nombre: query }));
      } else {
        dispatch(getAllOrdenes());
      }
    }, 300);
    window.scroll(0, 0);
    return () => {
      clearTimeout(identifier);
    };
  }, [query]);

  const handleStatusPayment = (ordenID, e) => {
    let estado = e.target.value;
    // Mostrar confirmación antes de activar/desactivar usuario
    Swal.fire({
      title:
        estado === "pendiente"
          ? "Cambiar a pendiente"
          : estado === "aprobado"
            ? "Cambiar a aprobado"
            : estado === "cancelado"
              ? "Cambiar a cancelado"
              : "",
      text:
        estado === "pendiente"
          ? `¿Estás seguro de cambiar a Pendiente esta orden ${ordenID}?`
          : estado === "aprobado"
            ? `¿Estás seguro de cambiar a Aprobado esta orden ${ordenID}?`
            : estado === "cancelado"
              ? `¿Estás seguro de cambiar a Cancelado esta orden ${ordenID}?`
              : "",
      icon: "warning",
      showCancelButton: true,
      confirmSelectColor: estado === "aprobado" ? "#3085d6" : "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText:
        estado === "pendiente" || estado === "cancelado" ? "Baja" : "Alta",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(OrdenesStatusChange({ id: ordenID, estado: estado }));
        setAux(1);
        Toast.fire({
          icon: "info",
          title: `Condición de pago modificado correctamente.`,
        });
      }
    });
  };

  const relevancias = [
    {
      id: 0,
      name: "Ordenar por",
    },
    {
      id: 1,
      name: "Menor Precio ",
    },
    {
      id: 2,
      name: "Mayor Precio",
    },
    {
      id: 3,
      name: "Apellido A-Z",
    },
    {
      id: 4,
      name: "Apellido Z-A",
    },
    {
      id: 5,
      name: "Fecha mas antigua ",
    },
    {
      id: 6,
      name: "Fecha mas reciente",
    },
  ];

  useEffect(() => {
    if (ordernarPor !== 0) {
      dispatch(getOrdenesByFilters(filtrosAplicados));
    }
  }, [ordernarPor]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const name = event.target.value;
      setQuery(name);
    }
  };

  const handleOrdenar = (event) => {
    const nuevoOrden = parseInt(event.target.value);
    setOrdernarPor(nuevoOrden);
    setFiltrosAplicados((prevFiltrosAplicados) => ({
      ...prevFiltrosAplicados,
      orden: nuevoOrden,
      nombre: query,
    }));
  };

  const handleInput = (value) => {
    const updatedQuery = value;
    setQuery(updatedQuery);
    if (updatedQuery === "") {
      dispatch(getAllOrdenes());
    }

    if (query.length > 0) {
      dispatch(setFilteringActiveOrdenes(true));
    } else {
      dispatch(setFilteringActiveOrdenes(false));
    }
  };

  return (
    <div className="container min-h-screen mb-auto pt-2 mx-auto">
      <div className="mt-16  relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Ordenes de compras
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Lista de ordenes de compra detallado.
            </p>
            <div className="flex flex-col sm: gap-y-4 sm:flex-row gap-x-3 justify-evenly sm:justify-end items-center  sm:space-x-4 pb-4 ">
              <Input
                type="text"
                placeholder="Ingrese el apellido..."
                className="flex items-center  w-100 h-23 ring-1 ring-gray-500"
                value={query}
                onChange={(e) => handleInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <select
                name="ordenarpor"
                className="border border-black text-sm hover:cursor-pointer w-48 rounded px-5  focus:border-black-500  bg-white py-2 text-left"
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
              </Button>{" "}
            </div>
          </caption>

          {ordenes && ordenes.length ? (
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Orden ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Condicion
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Ver</span>
                </th>
              </tr>
            </thead>
          ) : (
            <div className="py-20 text-center text-xl fold-semibold">
              <h2>No se encontraron resultados</h2>
            </div>
          )}

          <tbody>
            {ordenes &&
              ordenes.map((item) => (
                <tr
                  key={item.orden_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.orden_id}
                  </th>
                  <td className="px-6 py-4">
                    {item.Usuario.nombre_usuario}
                    <div>{item.Usuario.apellido_usuario}</div>
                  </td>
                  <td className="px-6 py-4">{numberMask(item.coste_total)}</td>
                  <td className="px-6 py-4">
                    <select
                      name="estado"
                      onChange={(e) => handleStatusPayment(item.orden_id, e)}
                      className={`border  border-gray-300 rounded px-3 py-2 mb-4 ${item.estado_pago === "aprobado" ? "text-white bg-green-500" : item.estado_pago === "pendiente" ? "text-white bg-yellow-500" : "text-white bg-red-500"}`}
                      value={item.estado_pago}
                    >
                      <option className="text-black bg-white" value="aprobado">
                        APROBADO
                      </option>
                      <option className="text-black bg-white" value="pendiente">
                        PENDIENTE
                      </option>
                      <option className="text-black bg-white" value="cancelado">
                        CANCELADO
                      </option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {item.createdAt && (
                      <>
                        {new Date(item.createdAt).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}{" "}
                        {new Date(item.createdAt).toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={
                        item.estado_pago === "pendiente" ||
                        item.estado_pago === "cancelado"
                      }
                      onClick={() => {
                        item.orden_id;
                      }}
                      className="font-medium ring-1 h-6 py-x-1 rounded w-[85px]  text-blue-600 dark:text-blue-500 hover:bg-sky-900 hover:text-white"
                    >
                      <Link to={`/admin/orders/${item.orden_id}`}>Ver</Link>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <OrderPagination />
      </div>
      <FiltersOrder
        query={query}
        setQuery={setQuery}
        setOrder={setOrdernarPor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApplyFilters={handleApplyFilters}
        className={`transition-transform sm:transition-opacity duration-300 ease-in-out ${isModalOpen ? "translate-x-0 md:opacity-100" : "-translate-x-full md:opacity-0 md:pointer-events-none"}`}
      />
    </div>
  );
}
