import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";

const Register = ({ isOpen, onClose, className }) => {
  const auth = useAuth();
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [nameRegister, setNameRegister] = useState("");
  const [lastNameRegister, setLastNameRegister] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister, nameRegister, onClose);
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    auth.registerWithGoogle();
    onClose();
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 flex  z-[20] bg-opacity-50 ${className}`}
      >
        <div className="flex justify-end  min-w-full min-h-10">
          <div className=" justify-center items-center bg-white p-8 rounded-lg w-full  h-[700px] max-w-lg lg:max-w-md xl:max-w-lg overflow-y-auto">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none   "
            >
              <img
                src="/assets/navbar-icons/back.svg"
                width="30px"
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
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setNameRegister(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Apellido
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setLastNameRegister(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Apellido"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmailRegister(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ejemplo@ejemplo.com"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPasswordRegister(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
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
                  className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm   "
                >
                  Registrarse
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => handleGoogle(e)}
                  className="flex w-full text-black justify-center my-4 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm "
                >
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
