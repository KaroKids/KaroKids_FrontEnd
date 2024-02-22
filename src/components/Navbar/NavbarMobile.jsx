import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import Login from "../Auth/Login";

const NavbarMobile = () => {
  const [openHamMenu, setOpenHamMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showMenu = () => {
    setOpenHamMenu(!openHamMenu);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { pathname } = useLocation();

  return (
    <nav className="py-2 fixed z-10 top-0 bg-white shadow-md shadow-gray-300 lg:hidden">
      <ul className="w-screen max-h-[50px] px-2 flex items-center gap-4">
        <li className="mr-auto">
          <Link to="/">
            <img
              src="/assets/images/logo-karokids.png"
              alt="Logo de KaroKids"
              className="w-[187px]"
            />
          </Link>
        </li>
        <li className="text-sky-500 font-medium pl-4">
          <a href="/create">+</a>
        </li>
        {pathname === "/productos" && (
          <li>
            <SearchBar />
          </li>
        )}
        <li onClick={handleOpenModal} className="cursor-pointer">
          <img
            src="/assets/navbar-icons/user.svg"
            alt="Logo usuarios"
            className="w-6 h-6"
          />
        </li>
        <li>
          <img
            src="/assets/navbar-icons/cart.svg"
            alt="Logo del carrito de compras"
            className="w-6 h-6"
          />
        </li>

        <li onClick={showMenu}>
          <img
            src="/assets/navbar-icons/ham-menu.svg"
            alt="Logo del Menú desplegable"
            className="w-6 h-6"
          />
        </li>
      </ul>
      <ul
        id="hamMenu"
        className={`${openHamMenu ? "fixed" : "hidden"} w-screen h-screen bg-white flex flex-col items-center py-8 font-medium text-slate-400 text-2xl gap-4`}
      >
        <Link to="/">
          <li className="text-slate-600">Inicio</li>
        </Link>
        <li>Recién Nacido</li>
        <li>Bebé</li>
        <li>Infantil</li>
        <li>Junior</li>
      </ul>
      <Login isOpen={isModalOpen} onClose={handleCloseModal} />
    </nav>
  );
};

export default NavbarMobile;
