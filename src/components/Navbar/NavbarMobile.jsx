import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";

const NavbarMobile = () => {
  const [openHamMenu, setOpenHamMenu] = useState(false);
  const showMenu = () => {
    setOpenHamMenu(!openHamMenu);
  };

  const { pathname } = useLocation();

  return (
    <nav className="py-2 fixed z-10 top-0 bg-white shadow-md shadow-gray-300 md:hidden">
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
          <a href="/create">AddProduct</a>
        </li>
        {pathname === "/productos" && (
          <li>
            <SearchBar />
          </li>
        )}
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
          <li className="text-slate-600">Home</li>
        </Link>
        <li>Recién Nacido</li>
        <li>Bebé</li>
        <li>Infantil</li>
        <li>Junior</li>
      </ul>
    </nav>
  );
};

export default NavbarMobile;
