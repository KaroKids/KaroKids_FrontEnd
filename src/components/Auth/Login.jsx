import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button } from "../ui/button";
import Register from "./Register";
import Swal from "sweetalert2";

export default function Login({ isOpen, onClose, className }) {
  const auth = useAuth();
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(mail, password, onClose);
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    auth.loginWithGoogle();
    onClose();
  };

  const handleReset = async () => {
    const { value: email } = await Swal.fire({
      title: "Restablecer contraseña",
      input: "email",
      inputLabel: "Ingrese su email",
      inputPlaceholder: "ejemplo@ejemplo.com",
    });
    if (email) {
      auth.resetPassword(email);
    }
  };
  return (
    <>
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 flex bg-gray-800 z-[20] bg-opacity-50 ${className}`}
      >
        <div className="flex justify-end  min-w-full min-h-10 ">
          <div className="  justify-center items-center bg-white p-8 rounded-lg w-full  h-[700px] max-w-lg lg:max-w-md xl:max-w-lg overflow-y-auto">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none   "
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-12 mb-12 w-auto"
                src="/assets/images/logo-karokids.png"
                alt="Your Company"
              />
            </div>
            <form className="space-y-6">
              <div className="my-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email:
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="mail@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
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
                    Contraseña:
                  </label>
                  <span
                    onClick={handleReset}
                    className=" text-sm text-gray-500 cursor-pointer"
                  >
                    Olvidé mi contraseña
                  </span>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Ingrese su contraseña"
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
                  className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm   "
                >
                  Ingresar
                </Button>

                <Button
                  variant="outline"
                  onClick={(e) => handleGoogle(e)}
                  className="flex w-full text-black justify-center my-4 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm "
                >
                  <img
                    src="/assets/navbar-icons/google.svg"
                    width="30px"
                    height="50px"
                    alt="logo de google"
                  />
                  <label className="mx-4">Ingresar con Google</label>
                </Button>
              </div>
            </form>
            <div className="flex justify-center">
              <span
                onClick={handleOpenModal}
                className="text-center mt-10 text-sm text-gray-500 cursor-pointer"
              >
                No se ha registrado aún?
              </span>
            </div>
          </div>
        </div>
        <Register
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          className={`transition-opacity duration-300 ease-in-out ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        />
      </div>
    </>
  );
}
