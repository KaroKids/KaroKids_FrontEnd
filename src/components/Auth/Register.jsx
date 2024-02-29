import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { postUser } from "@/redux/userAction";
import { getUserByEmail } from "@/redux/userAction";
import Swal from "sweetalert2";

const Register = ({ isOpen, onClose, className }) => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
		customClass: {
			popup: "my-toast",
		},
	});
	const auth = useAuth();

	const dispatch = useDispatch();
	const [emailRegister, setEmailRegister] = useState("");
	const [passwordRegister, setPasswordRegister] = useState("");
	const [nameRegister, setNameRegister] = useState("");
	const [lastNameRegister, setLastNameRegister] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		const { payload } = await dispatch(getUserByEmail(emailRegister));

		if (payload.email_usuario) {
			Toast.fire({
				icon: "error",
				title: "El email ya existe en la BD",
			});
		} else {
			const body = {
				nombre_usuario: nameRegister,
				apellido_usuario: lastNameRegister,
				email_usuario: emailRegister,
			};

			dispatch(postUser(body));
			auth.register(emailRegister, passwordRegister, nameRegister, onClose);
		}
	};

	const handleGoogle = async (e) => {
		e.preventDefault();
		const google = await auth.registerWithGoogle();

		const { user } = google;
		const response = await dispatch(getUserByEmail(user.email));
		const payload = response?.payload; // Verificar si response existe y luego obtener payload
		if (payload && payload.email_usuario) {
			Toast.fire({
				icon: "error",
				title: "El email ya existe en la BD",
			});
		} else {
			const FirstName = user.displayName?.split(" ")[0];
			const LastName =
				user.displayName?.split(" ")[user.displayName?.split(" ").length - 1];
			const body = {
				nombre_usuario: FirstName,
				apellido_usuario: LastName,
				email_usuario: user.email,
			};
			await dispatch(postUser(body));
			await auth.logout();
			Toast.fire({
				icon: "success",
				title: "Registro finalizado!",
			});
			onClose();
		}
	};

	return (
		<>
			<div
				className={`overflow-y-auto fixed top-0 right-0 bottom-0 left-0 flex  z-[20] bg-opacity-50 ${className}`}>
				<div className="flex justify-end  min-w-full min-h-10">
					<div className="justify-center items-center bg-white p-8 w-full h-screen max-w-lg lg:max-w-md xl:max-w-lg overflow-y-auto">
						<button
							onClick={onClose}
							className="text-gray-600 hover:text-gray-800 focus:outline-none   ">
							<img
								src="/assets/navbar-icons/back.svg"
								width="24px"
								alt="logo atras"
							/>
						</button>
						<div className="sm:mx-auto sm:w-full sm:max-w-sm">
							<img
								className="mx-auto h-12 mb-12 w-auto"
								src="/assets/images/logo-karokids.png"
								alt="Your Company"
							/>
						</div>
						<form className="space-y-6">
							<div>
								<label
									htmlFor="nameRegisterLabel"
									className="block text-sm font-medium leading-6 text-gray-900">
									Nombre
								</label>
								<div className="mt-2">
									<input
										onChange={(e) => setNameRegister(e.target.value)}
										name="nameRegister"
										type="text"
										placeholder="Nombre"
										className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="lastnameRegisterLabel"
									className="block text-sm font-medium leading-6 text-gray-900">
									Apellido
								</label>
								<div className="mt-2">
									<input
										onChange={(e) => setLastNameRegister(e.target.value)}
										name="lastnameRegister"
										type="text"
										placeholder="Apellido"
										className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="emailRegisterLabel"
									className="block text-sm font-medium leading-6 text-gray-900">
									Email
								</label>
								<div className="mt-2">
									<input
										onChange={(e) => setEmailRegister(e.target.value)}
										name="emailRegister"
										type="email"
										autoComplete="email"
										placeholder="ejemplo@ejemplo.com"
										className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="passwordRegisterLabel"
										className="block text-sm font-medium leading-6 text-gray-900">
										Contraseña
									</label>
								</div>
								<div className="mt-2">
									<input
										onChange={(e) => setPasswordRegister(e.target.value)}
										name="passwordRegister"
										type="password"
										autoComplete="current-password"
										placeholder="Ingrese su contraseña"
										className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<Button
									variant="detail"
									onClick={(e) => handleRegister(e)}
									type="submit"
									className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm   ">
									Registrarse
								</Button>
								<Button
									variant="outline"
									onClick={(e) => handleGoogle(e)}
									className="flex w-full text-black justify-center my-4 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm ">
									{" "}
									<img
										src="/assets/navbar-icons/google.svg"
										width="30px"
										height="50px"
										alt="logo de google"
									/>
									<label className="mx-4 cursor-pointer">
										Registrarse con Google
									</label>
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
