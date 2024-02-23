import React from "react";
import { Button } from "../ui/button";

const DatosPersonales = () => {
	return (
		<div>
			<form className="space-y-6">
				<div className="my-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium leading-6 text-gray-900">
						Email:
					</label>
					<div className="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							placeholder="example@example.com"
							onChange={(e) => setEmail(e.target.value)}
							className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="password"
							className="block text-sm font-medium leading-6 text-gray-900">
							Contraseña:
						</label>
					</div>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							placeholder="Ingrese su contraseña..."
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
							className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<Button
						variant="detail"
						onClick={(e) => handleLogin(e)}
						className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm   ">
						Ingresar
					</Button>
				</div>
			</form>
		</div>
	);
};

export default DatosPersonales;
