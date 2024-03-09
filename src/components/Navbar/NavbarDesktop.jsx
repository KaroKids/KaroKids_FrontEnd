import { useState } from "react";
import Login from "../Auth/Login";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UserModal from "../User/UserModal";
import { useSelector } from "react-redux";
import NavbarModal from "./NavbarModal";

const NavbarDesktop = () => {
  const auth = useAuth();
  const { displayName } = auth.user;
  const userName = displayName?.split(" ")[0];
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [CategoriasModalOpen, setCategoriasModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserModalOpen(false);
  };

  const handleOpenUser = () => {
    setUserModalOpen(true);
  };

  const handleCloseUser = () => {
    setUserModalOpen(false);
  };
  const handleOpenCategorias = () => {
    setCategoriasModalOpen(true);
  };

  const handleCloseCategorias = () => {
    setCategoriasModalOpen(false);
  };

  const user = useSelector((state) => state.users.user);

  return (
    <nav className="hidden h-20 max-w-screen bg-white px-10 xl:px-40 md:flex items-center gap-2 shadow-md shadow-gray-300 fixed z-10 top-0 w-full">
      <ul className="flex gap-x-5 items-center flex-wrap font-medium md:max-w-[35%]">
        <Link to="/">
          <li>Inicio</li>
        </Link>
        {user?.roles === "admin" && (
          <Link to="/admin">
            <li>Administración</li>
          </Link>
        )}
        <li
          onClick={handleOpenCategorias}
          className="flex flex-row gap-x-2 items-center cursor-pointer"
        >
          Productos
          <img
            src="/assets/navbar-icons/arrow-down.svg"
            alt="Logo flecha abajo"
            className="w-2 h-2"
          />
        </li>
      </ul>
      <figure className="mx-auto">
        <Link to="/">
          <img
            src="/assets/images/logo-karokids.png"
            alt="Logo de KaroKids"
            className="w-[184px] h-[45px]"
          />
        </Link>
      </figure>
      <ul className="flex gap-5 items-center">
        {pathname === "/productos" && (
          <li>
            <SearchBar />
          </li>
        )}
        {userName ? (
          <li
            onClick={handleOpenUser}
            className="flex flex-row gap-x-2 items-end cursor-pointer"
          >
            <img
              src="/assets/navbar-icons/user.svg"
              alt="Logo usuarios"
              className="w-6 h-6"
            />
            <p className="text-sm">Hola, {userName}</p>
          </li>
        ) : (
          <li
            onClick={handleOpenModal}
            className="flex flex-row gap-x-2 items-end cursor-pointer"
          >
            <img
              src="/assets/navbar-icons/user.svg"
              alt="Logo usuarios"
              className="w-6 h-6"
            />
          </li>
        )}

        {auth.user ? (
          <li className="cursor-pointer">
            <Link to="/favoritos">
              <img
                src="/assets/navbar-icons/fav-blue.svg"
                alt="Logo de Favoritos"
                className="w-6 h-6"
              />
            </Link>
          </li>
        ) : (
          <li className="cursor-pointer" onClick={handleOpenModal}>
            <img
              src="/assets/navbar-icons/fav-blue.svg"
              alt="Logo de Favoritos"
              className="w-6 h-6"
            />
          </li>
        )}

        <Link to="/carrito">
          <li className="cursor-pointer">
            <img
              src="/assets/navbar-icons/cart-blue.svg"
              alt="Logo del carrito de compras"
              className="w-6 h-6"
            />
          </li>
        </Link>
      </ul>

      <Login
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className={`transition-opacity duration-300 ease-in-out ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <UserModal isOpen={userModalOpen} onClose={handleCloseUser} />
      <div className="relative">
        <NavbarModal
          isOpen={CategoriasModalOpen}
          onClose={handleCloseCategorias}
          className={`transition-opacity duration-300 ease-in-out ${CategoriasModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        />
      </div>
    </nav>
  );
};

export default NavbarDesktop;
