import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";

const UserModal = ({ isOpen, onClose }) => {
  const auth = useAuth();
  const { displayName } = auth.user;
  const userName = displayName?.split(" ")[0];

  const handleLogout = (e) => {
    e.preventDefault();
    auth.logout(onClose);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 flex  z-[20]  bg-gray-800 bg-opacity-50 ${isOpen ? "" : "hidden"}`}
      >
        <div className="flex justify-end  min-w-full min-h-10">
          <div className=" justify-center items-center bg-white p-8 rounded-lg w-full  h-[580px] max-w-lg lg:max-w-md xl:max-w-lg overflow-y-auto">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none "
            >
              <img
                src="/assets/navbar-icons/back.svg"
                width="30px"
                alt="logo atras"
              />
            </button>
            <form className="space-y-6">
              <div className="  border-t-2 flex flex-col justify-center items-center mt-5 mb-20">
                <h1 className="my-7 font-bold text-xl">Hola, {userName}!</h1>
                <p className="text-center">
                  Desde <b>Mi Cuenta</b> puedes ver un resumen de tus
                  actividades recientes y actualizar tu información
                </p>
              </div>
              <div className="flex flex-col gap-y-5">
                <div>
                  <Link to="/">
                    <Button
                      variant="detail"
                      type="submit"
                      className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm   "
                    >
                      Mi Cuenta
                    </Button>
                  </Link>
                </div>
                <div>
                  <Button
                    onClick={(e) => handleLogout(e)}
                    variant="outline"
                    type="submit"
                    className="flex text-black w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm   "
                  >
                    Cerrar Sesion
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
