import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import DatosPersonales from "./DatosPersonales";
import ControlView from "./ControlView";
import UserPedidos from "./UserPedidos";
import { useLocation } from "react-router-dom";

const PanelUsuario = () => {
  let { pathname } = useLocation();
  const auth = useAuth();
  const { displayName } = auth.user;
  const userName = displayName?.split(" ")[0];

  return (
    <div className="container flex flex-col justify-start my-40 items-start  min-h-screen xl:mx-auto ">
      <h1 className="text-3xl font-semibold mb-2">Mi cuenta</h1>
      <div className="flex  flex-col lg:flex-row items-start border-t-2 h-auto border-t-slate-300 py-6 gap-20 w-full">
        <div className="flex flex-col   items-start h-auto w-full lg:w-auto md:h-[500px] ">
          <div className="pt-12 px-2  bg-slate-100 h-max w-full lg:h-full lg:w-80 ">
            <h1 className="text-center mb-10 text-xl font-medium">
              Hola {userName}!
            </h1>
            <p className="text-justify border-b-2 border-b-slate-300 h-36 w-full text-slate-500 p-1">
              Desde Mi Cuenta puedes ver un resumen de tus actividades recientes
              y actualizar tu información.
            </p>
          </div>
          <ul className="flex flex-col bg-slate-100  justify-evenly items-start pl-4 h-40 md:h-full w-full  lg:w-80">
            <Link to="/usuario/panel-control">
              <li
                className={
                  pathname === "/usuario/panel-control"
                    ? " font-medium"
                    : " text-slate-400"
                }
              >
                <h2>Perfil</h2>{" "}
              </li>
            </Link>
            <Link to="/usuario/datos-personales">
              <li
                className={
                  pathname === "/usuario/datos-personales"
                    ? " font-medium"
                    : " text-slate-400"
                }
              >
                <h2>Datos Personales</h2>{" "}
              </li>
            </Link>
            <Link to="/usuario/pedidos">
              <li
                className={
                  pathname === "/usuario/pedidos"
                    ? " font-medium"
                    : " text-slate-400"
                }
              >
                <h2>Mis pedidos</h2>{" "}
              </li>
            </Link>
          </ul>
        </div>
        {pathname === "/usuario/panel-control" && <ControlView />}
        {pathname === "/usuario/datos-personales" && <DatosPersonales />}
        {pathname === "/usuario/pedidos" && <UserPedidos />}
      </div>
    </div>
  );
};

export default PanelUsuario;
