import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getPutUser, getUserByEmail } from "@/redux/userAction";
import Swal from "sweetalert2";

const DatosPersonales = () => {
	const auth = useAuth();
	const { photoURL, email } = auth.user;
	const user = useSelector((state) => state.users.user);
	const [nombre, setNombre] = useState(user.nombre_usuario);
	const [apellido, setApellido] = useState(user.apellido_usuario);
	const [emailData, setEmail] = useState(user.email_usuario);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

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

	const dispatch = useDispatch();
	const handlePut = (e) => {
		e.preventDefault();
		const body = {
			nombre_usuario: nombre,
			apellido_usuario: apellido,
			email_usuario: emailData,
			usuario_id: user.usuario_id,
		};
		dispatch(getPutUser(body));
		Toast.fire({
			icon: "success",
			title: "Información actualizada exitosamente.",
		});
	};
	const handlePasswordChange = (e) => {
		e.preventDefault();
		auth.handleChangePassword(currentPassword, newPassword);
	};

	useEffect(() => {
		dispatch(getUserByEmail(email));
	}, []);

	return (
		<div className="flex flex-col lg:flex-row justify-center  lg:h-[500px] w-full">
			<form className="lg:space-y-6 py-6 w-full px-4">
				<h1 className=" mb-10 font-semibold text-left text-xl">
					Actualizar datos personales
				</h1>
				<div className="my-4">
					<label
						htmlFor="nombreLabel"
						className="block text-sm font-medium leading-6 text-gray-900">
						Nombre:
					</label>
					<input
						id="nombre"
						name="nombre"
						type="text"
						onChange={(e) => setNombre(e.target.value)}
						defaultValue={user.nombre_usuario}
						className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>

				<div className="my-4 ">
					<div className="flex items-center justify-between">
						<label
							htmlFor="apellidoLabel"
							className="block text-sm font-medium leading-6 text-gray-900">
							Apellido:
						</label>
					</div>

					<input
						id="apellido"
						name="apellido"
						type="text"
						onChange={(e) => setApellido(e.target.value)}
						defaultValue={user.apellido_usuario}
						className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>

				<Button
					variant="detail"
					onClick={(e) => handlePut(e)}
					className="w-full text-sm font-semibold leading-6 my-auto text-white shadow-sm">
					Modificar
				</Button>
			</form>
			<form className="lg:space-y-6 py-6 w-full px-4">
				{auth.user.providerData[0].providerId === "google.com" ? (
					<h1 className="mb-10 font-semibold text-left text-xl">
						Operación inválida para cuenta de Google
					</h1>
				) : (
					<h1 className="mb-10 font-semibold text-left text-xl">
						Actualizar contraseña
					</h1>
				)}

				<div className="my-4">
					<label
						htmlFor="contraseñaActualLabel"
						className="block text-sm font-medium leading-6 text-gray-900">
						Contraseña actual:
					</label>
					<input
						id="contraseñaActual"
						name="contraseñaActual"
						type="password"
						autoComplete="current-password"
						disabled={auth.user.providerData[0].providerId === "google.com"}
						onChange={(e) => setCurrentPassword(e.target.value)}
						className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>

				<div className="my-4 ">
					<div className="flex items-center justify-between">
						<label
							htmlFor="nuevaContraseñaLabel"
							className="block text-sm font-medium leading-6 text-gray-900">
							Nueva contraseña:
						</label>
					</div>

					<input
						id="nuevaContraseña"
						name="nuevaContraseña"
						type="password"
						autoComplete="new-password"
						disabled={auth.user.providerData[0].providerId === "google.com"}
						onChange={(e) => setNewPassword(e.target.value)}
						className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
				<Button
					variant="detail"
					disabled={auth.user.providerData[0].providerId === "google.com"}
					onClick={(e) => handlePasswordChange(e)}
					className="w-full text-sm font-semibold leading-6 my-1 text-white shadow-sm">
					Modificar
				</Button>
			</form>
		</div>
	);
};

export default DatosPersonales;
