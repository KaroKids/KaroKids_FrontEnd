import axios from "axios";
import { useState, useEffect } from "react";
import spinner from "/assets/images/spinner.svg";
import { NavLink } from "react-router-dom";
import { queryGlobal } from "@/redux/productosSlice";
import { useDispatch } from "react-redux";

const URL_ORDENES = import.meta.env.VITE_URL_ORDENES;
const URL_USERS = import.meta.env.VITE_URL_USERS;
const URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCT;

const Panel = () => {
  const [totalOrdenes, setTotalOrdenes] = useState(0);
  const [users, setUsers] = useState([]);
  const [productos, setProductos] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL_ORDENES);
        if (response && response.data) {
          setTotalOrdenes(
            response.data.elementosPaginados.length * response.data.totalPaginas
          );
          setLoading(false);
        }
      } catch (error) {
        console.log("No fue posible cargar las ordenes", error);
      }
    };

    fetchData();
  }, [totalOrdenes]);

  // Función para cargar la lista de usuarios al montar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`${URL_USERS}`);
        // Verificar si response.data es un array antes de asignarlo a users
        if (Array.isArray(response.data.elementosPaginados)) {
          setUsers(response.data);
          setLoading(false);
        } else {
          console.log("La respuesta no es un array:", response.data);
        }
      } catch (error) {
        console.log("Error al cargar la lista de usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(URL_PRODUCTS);

        if (response.data) {
          setProductos(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("No fue posible cargar los productos", error);
      }
    };
    dispatch(queryGlobal(""));
    fetchProductos();
  }, []);

  const stats = [
    {
      id: 1,
      name: "Ordenes de compra",
      value: `+ ${totalOrdenes ? totalOrdenes : 0}`,
      menu: "Productos",
      link: "/admin/orders",
    },
    {
      id: 2,
      name: "Clientes registrados",
      value: `+ ${users.elementosPaginados?.length * users?.totalPaginas}`,
      menu: "Usuarios",
      link: "/admin/users",
    },
    {
      id: 3,
      name: "Productos disponibles",
      value: `+ ${productos.elementosPaginados?.length * productos?.totalPaginas}`,
      menu: "Productos",
      link: "/admin/products",
    },
  ];
  return (
    <div className="mx-auto  mt-8  ">
      <dl className="grid grid-cols-1 gap-x-5 shadow-xl hover:shadow-lg focus:outline-none  border py-8 rounded-md justify-between sm: gap-y-6 lg:gap-y-16 text-center lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="mx-auto item-center rounded hover:cursor-pointer  max-w-xs ring-2  ring-white-500 p-10 bg-sky-700 flex flex-col gap-y-4"
          >
            <NavLink
              to={stat.link}
              // onClick={(e) => { handleMenuSelect(e, stat.menu); updateMenuSelected({ menu: stat.menu, component: stat.component }); }}
              className="text-base w-40 lg:w-auto text-center leading-7 ring-2 py-3 p-5  ring-white hover:bg-sky-100 rounded-md hover:text-pink-500 text-white transition"
            >
              {stat.name}
            </NavLink>

            <dd className="order-first content-center item-center justify-center text-3xl font-semibold tracking-tight text-white border-red-500 sm:text-5xl">
              {!loading ? (
                stat.value
              ) : (
                <img
                  src={spinner}
                  alt="Loading..."
                  className=" bg-transparent rounded-lg mx-auto inset-1 flex items-center justify-center   w-11 h-11"
                />
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Panel;
