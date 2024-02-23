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
		<div className="container flex flex-col justify-start my-40 items-start  min-h-screen mx-60 ">
			<h1 className="text-3xl font-semibold mb-2">Mi cuenta</h1>
			<div className="flex flex-row items-start border-t-2  h-[500px] border-t-slate-300 py-6 gap-20 w-full">
				<div className="flex flex-col items-start h-[500px]">
					<div className="pt-12 px-2 bg-slate-100   h-full w-80 border-b-2 border-b-slate-300">
						<h1 className="text-left mb-10 text-xl font-medium">
							Hola {userName}!
						</h1>
						<p className="text-start text-slate-500">
							Desde Mi Cuenta puedes ver un resumen de tus actividades recientes
							y actualizar tu informacion.
						</p>
					</div>
					<ul className="flex flex-col bg-slate-100  justify-evenly items-start pl-2 h-full  w-80">
						<Link to="/usuario/panel-control">
							<li
								className={
									pathname === "/usuario/panel-control"
										? "font-medium"
										: "text-slate-400"
								}>
								<h2>Panel de Control</h2>{" "}
							</li>
						</Link>
						<Link to="/usuario/datos-personales">
							<li
								className={
									pathname === "/usuario/datos-personales"
										? "font-medium"
										: "text-slate-400"
								}>
								<h2>Datos Personales</h2>{" "}
							</li>
						</Link>
						<Link to="/usuario/pedidos">
							<li
								className={
									pathname === "/usuario/pedidos"
										? "font-medium"
										: "text-slate-400"
								}>
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
