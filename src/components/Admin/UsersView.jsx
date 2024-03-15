import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import LoadingView from "../ui/Loading";
import UserPagination from "./UserPagination";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  getUsersByFilters,
  getUsersByName,
  toggleUserRol,
  toggleUserStatus,
} from "@/redux/userAction";
import filterIcon from "/assets/images/filterIcon.svg";
import FiltersUser from "./FiltersUser";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function UsersView() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [pageLoading, setPageLoading] = useState(true);
  const [toastShown, setToastShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtrosAplicados, setFiltrosAplicados] = useState([]);
  const [query, setQuery] = useState("");
  const [ordernarPor, setOrdernarPor] = useState(0);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilters = (filtrosSeleccionados) => {
    setFiltrosAplicados(filtrosSeleccionados);
  };

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
    }));
  };

  const handleInput = (value) => {
    const updatedQuery = value;
    setQuery(updatedQuery);
    if (updatedQuery === "") {
      dispatch(getAllUsers());
    }
  };

  const relevancias = [
    {
      id: 0,
      name: "Ordenar por",
    },
    {
      id: 1,
      name: "Apellido A-Z",
    },
    {
      id: 2,
      name: "Apellido Z-A",
    },
    {
      id: 3,
      name: "Nombre A-Z",
    },
    {
      id: 4,
      name: "Nombre Z-A",
    },
    {
      id: 5,
      name: "Email A-Z",
    },
    {
      id: 6,
      name: "Email Z-A",
    },
  ];

  // Función para cargar la lista de usuarios al montar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setPageLoading(true);
        await dispatch(getAllUsers());
      } catch (error) {
        console.log("Error al cargar la lista de usuarios:", error);
      } finally {
        // Establecer pageLoading en false una vez que se haya completado la solicitud
        setPageLoading(false);
      }
    };

    fetchUsuarios();
  }, [dispatch]);

  useEffect(() => {
    if (!users) {
      // Los productos aún no se han cargado, establece el estado de carga en true
      setPageLoading(true);
    } else {
      // Los productos se han cargado, establece el estado de carga en false
      setPageLoading(false);
      if (!toastShown) {
        // Muestra la notificación solo si aún no se ha mostrado
        if (users) {
          Toast.fire({
            icon: "info",
            title: "Datos de clientes obtenidos con éxito...",
          });
        }
        // Marca la notificación como mostrada
        setToastShown(true);
      }
    }
  }, [users, toastShown]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (query.length > 0) {
        dispatch(getUsersByFilters({ nombre: query }));
      } else {
        dispatch(getAllUsers());
      }
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [query]);

  useEffect(() => {
    dispatch(getUsersByFilters(filtrosAplicados));
  }, [dispatch]);

  useEffect(() => {
    if (ordernarPor !== 0) {
      dispatch(getUsersByFilters(filtrosAplicados));
    }
  }, [ordernarPor, dispatch]);

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

  const handleLogicDelete = (usuarioId, inactivo) => {
    // Mostrar confirmación antes de activar/desactivar usuario
    Swal.fire({
      title: inactivo ? "Activar Usuario" : "Desactivar Usuario",
      text: inactivo
        ? "¿Estás seguro de activar este usuario?"
        : "¿Estás seguro de desactivar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: inactivo ? "#3085d6" : "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: inactivo ? "Activar" : "Desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la función para activar/desactivar usuario
        dispatch(toggleUserStatus(usuarioId, query));
      }
    });
  };

  const handleUserRol = (usuarioId, roles) => {
    Swal.fire({
      title:
        roles === "admin"
          ? "Convertir en Administrador"
          : "Convertir en cliente",
      text: "¿Estás seguro de cambiar el rol de este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(toggleUserRol(usuarioId, roles, query));
      }
    });
  };

  if (pageLoading) {
    return <LoadingView />;
  }
  return (
    <div className="bg-white mt-20 sm:mt-0">
      {!pageLoading && (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-36 lg:py-28 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
          {users && users.length === 0 && (
            <div className="py-20 text-center text-xl fold-semibold">
              <h2>No se encontraron resultados</h2>
            </div>
          )}
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
          <div className="overflow-x-auto">
            <div className="table w-full border-collapse">
              <div className="table-header-group bg-gray-50">
                <div className="table-row">
                  <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Nombre
                  </div>
                  <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Email
                  </div>
                  <div className="table-cell text-center px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Rol
                  </div>
                  <div className="table-cell text-center px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Estado
                  </div>
                  <div className="table-cell text-center px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Acciones
                  </div>
                </div>
              </div>
              <div className="table-row-group">
                {users?.map((usuario) => (
                  <div
                    key={usuario.usuario_id}
                    className="table-row border-gray-900"
                  >
                    <div className="table-cell px-6 py-4 whitespace-nowrap">
                      {usuario.nombre_usuario + " " + usuario.apellido_usuario}
                    </div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap">
                      {usuario.email_usuario}
                    </div>
                    <div className="table-cell text-center px-6 py-4 whitespace-nowrap">
                      {usuario.roles === "admin" ? (
                        <button
                          onClick={() =>
                            handleUserRol(usuario.usuario_id, "client", true)
                          }
                          className="text-black w-22 h-6 pl-2 pr-2 w-[99px]
													py-x-1 rounded bg-yellow-500 hover:bg-white
													hover:text-yellow-500 hover:cursor-pointer"
                        >
                          Admin
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleUserRol(usuario.usuario_id, "admin", true)
                          }
                          className="text-white w-22 h-6 pl-2 pr-2 w-[99px]
													py-x-1 rounded bg-blue-500 hover:bg-white
													hover:text-blue-500 hover:cursor-pointer"
                        >
                          Cliente
                        </button>
                      )}
                    </div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap">
                      {" "}
                      {usuario.inactivo ? (
                        <button
                          onClick={() =>
                            handleLogicDelete(usuario.usuario_id, true)
                          }
                          className="text-white w-22 h-6 pl-2 pr-2 w-[99px] py-x-1 rounded bg-blue-500 hover:bg-white hover:text-blue-500 hover:cursor-pointer"
                        >
                          Activar
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleLogicDelete(usuario.usuario_id, false)
                          }
                          className="text-white w-22 h-6 pl-2 pr-2 w-[99px] py-x-1 rounded bg-red-500 hover:bg-white hover:text-red-500 hover:cursor-pointer"
                        >
                          Desactivar
                        </button>
                      )}
                    </div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap">
                      {/* Agrega aquí los botones de acciones, por ejemplo: */}
                      <button className="text-indigo-600 rounded hover:bg-blue-500  pr-2 pl-2 ring-1 w-[115px] hover:text-white mr-2">
                        Ver Ordenes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <UserPagination />
      <FiltersUser
        query={query}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApplyFilters={handleApplyFilters}
        className={`transition-transform sm:transition-opacity duration-300 ease-in-out ${isModalOpen ? "translate-x-0 md:opacity-100" : "-translate-x-full md:opacity-0 md:pointer-events-none"}`}
      />
    </div>
  );
}

export default UsersView;
