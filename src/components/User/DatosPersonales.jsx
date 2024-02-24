import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

const DatosPersonales = () => {
	const auth = useAuth();
	const { user } = useAuth();
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const handlePasswordChange = (e) => {
		e.preventDefault();
		auth.handleChangePassword(currentPassword, newPassword);
	};

	return (
		<div className="flex flex-row gap-20 w-[900px]">
			<form className="space-y-6 w-[400px]">
				<h1 className="mb-10 font-semibold text-xl">
					Modificá tus datos personales
				</h1>
				<div className="my-4">
					<label
						htmlFor="nombre"
						className="block text-sm font-medium leading-6 text-gray-900">
						Nombre
					</label>
					<div className="mt-1">
						<input
							id="nombre"
							name="nombre"
							type="text"
							className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="apellido"
							className="block text-sm font-medium leading-6 text-gray-900">
							Apellido
						</label>
					</div>
					<div className="mt-1">
						<input
							id="apellido"
							name="apellido"
							type="text"
							className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900">
							Email
						</label>
					</div>
					<div className="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							value={user.email}
							className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="date"
							className="block text-sm font-medium leading-6 text-gray-900">
							Número de Teléfono
						</label>
					</div>
					<div className="mt-1"></div>
				</div>

				<div>
					<Button
						variant="outline"
						className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm   ">
						Modificar
					</Button>
				</div>
			</form>

			<form className="space-y-6 w-[400px]">
				<h1 className="mb-10 font-semibold text-xl">Modificá tu contraseña</h1>
				<div className="my-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium leading-6 text-gray-900">
						Contraseña actual
					</label>
					<div className="mt-1">
						<input
							id="actualPassword"
							name="actualPassword"
							type="password"
							onChange={(e) => setCurrentPassword(e.target.value)}
							className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div className="my-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium leading-6 text-gray-900">
						Nueva contraseña
					</label>
					<div className="mt-1">
						<input
							id="newPassword"
							name="newPassword"
							type="password"
							onChange={(e) => setNewPassword(e.target.value)}
							className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<Button
						variant="outline"
						onClick={(e) => handlePasswordChange(e)}
						className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm mt-[202px]">
						Modificar
					</Button>
				</div>
			</form>
		</div>
	);
};

export default DatosPersonales;
