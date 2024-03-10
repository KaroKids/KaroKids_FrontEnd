import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { postUser } from "@/redux/userAction";
import { getUserByEmail } from "@/redux/userAction";
import Swal from "sweetalert2";
import validateRegistration from "./validator";

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
	const [isChecked, setIsChecked] = useState(false);
	const [errors, setErrors] = useState({});

	const handleOnChange = () => {
		setIsChecked(!isChecked);
	};

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

	useEffect(() => {
		const validationErrors = validateRegistration(
			nameRegister,
			lastNameRegister,
			emailRegister,
			passwordRegister
		);
		setErrors(validationErrors);
	}, [nameRegister, lastNameRegister, emailRegister, passwordRegister]);

	const handleNameChange = (e) => {
		setNameRegister(e.target.value);
		setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
	};

	const handleLastNameChange = (e) => {
		setLastNameRegister(e.target.value);
		setErrors((prevErrors) => ({ ...prevErrors, lastName: "" }));
	};

	const handleEmailChange = (e) => {
		setEmailRegister(e.target.value);
		setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
	};

	const handlePasswordChange = (e) => {
		setPasswordRegister(e.target.value);
		setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
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
										onChange={handleNameChange}
										value={nameRegister}
										name="nameRegister"
										type="text"
										placeholder="Nombre"
										className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{nameRegister.length > 0 && errors.name && (
										<p className="text-red-500 text-sm mt-1">{errors.name}</p>
									)}
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
										onChange={handleLastNameChange}
										value={lastNameRegister}
										name="lastnameRegister"
										type="text"
										placeholder="Apellido"
										className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{lastNameRegister.length > 0 && errors.lastName && (
										<p className="text-red-500 text-sm mt-1">
											{errors.lastName}
										</p>
									)}
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
										onChange={handleEmailChange}
										value={emailRegister}
										name="emailRegister"
										type="email"
										autoComplete="email"
										placeholder="ejemplo@ejemplo.com"
										className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{emailRegister.length > 0 && errors.email && (
										<p className="text-red-500 text-sm mt-1">{errors.email}</p>
									)}
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
										onChange={handlePasswordChange}
										value={passwordRegister}
										name="passwordRegister"
										type="password"
										autoComplete="current-password"
										placeholder="Ingrese su contraseña"
										className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{passwordRegister.length > 0 && errors.password && (
										<p className="text-red-500 text-sm mt-1">
											{errors.password}
										</p>
									)}
								</div>
							</div>
							<div className="flex flex-row">
								<input
									type="checkbox"
									name="registerCheck"
									checked={isChecked}
									onChange={handleOnChange}
								/>
								<p className="pl-2">
									Acepto los
									<a href="/legales" className="underline pl-2">
										Términos y Condiciones
									</a>
								</p>
							</div>

							<div>
								<Button
									variant="detail"
									onClick={(e) => handleRegister(e)}
									type="submit"
									disabled={!isChecked || Object.keys(errors).length > 0}
									className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm   ">
									Registrarse
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
