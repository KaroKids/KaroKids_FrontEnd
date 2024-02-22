import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
	const auth = useAuth();
	const [emailRegister, setEmailRegister] = useState("");
	const [passwordRegister, setPasswordRegister] = useState("");

	const handleRegister = (e) => {
		e.preventDefault();
		auth.register(emailRegister, passwordRegister);
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 lg:mt-12">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
						Registrate
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900">
								Email
							</label>
							<div className="mt-2">
								<input
									onChange={(e) => setEmailRegister(e.target.value)}
									id="email"
									name="email"
									type="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900">
									Contraseña
								</label>
							</div>
							<div className="mt-2">
								<input
									onChange={(e) => setPasswordRegister(e.target.value)}
									id="password"
									name="password"
									type="password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<button
								onClick={(e) => handleRegister(e)}
								type="submit"
								className="flex w-full justify-center rounded-md bg-[#38BDF8] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Registrarse
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
