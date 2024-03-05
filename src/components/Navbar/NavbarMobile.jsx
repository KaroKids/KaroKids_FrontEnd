import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
import UserModal from "../User/UserModal";
import { useAuth } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsByFilters,
  setFilteringActive,
} from "@/redux/productosActions";

const NavbarMobile = () => {
  const auth = useAuth();
  const { displayName } = auth.user;
  const userName = displayName?.split(" ")[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openHamMenu, setOpenHamMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const handleClick = (filtro) => {
    dispatch(setFilteringActive(true));
    dispatch(getProductsByFilters({ edad: filtro }));
    navigate("/productos");
    showMenu();
  };

  const showMenu = () => {
    setOpenHamMenu(!openHamMenu);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenUser = () => {
    setUserModalOpen(true);
  };

  const handleCloseUser = () => {
    setUserModalOpen(false);
  };

  const { pathname } = useLocation();

  const user = useSelector((state) => state.users.user);

  return (
    <nav className=" py-2 fixed z-10 top-0 bg-white shadow-md shadow-gray-300 lg:hidden">
      <div className="mb-4">
        <ul className=" w-screen max-h-[50px] px-2 flex items-center gap-4">
          {userName ? (
            <li
              onClick={handleOpenUser}
              className="flex flex-row gap-x-2 items-end"
            >
              <img
                src="/assets/navbar-icons/user-black.svg"
                alt="Logo usuarios"
                className="w-6 h-6"
              />
            </li>
          ) : (
            <li
              onClick={handleOpenModal}
              className="flex flex-row gap-x-2 items-end"
            >
              <img
                src="/assets/navbar-icons/user-black.svg"
                alt="Logo usuarios"
                className="w-6 h-6"
              />
            </li>
          )}
          {auth.user ? (
            <li>
              <Link to="/favoritos">
                <img
                  src="/assets/navbar-icons/favourite-black.svg"
                  alt="Logo de Favoritos"
                  className="w-6 h-6"
                />
              </Link>
            </li>
          ) : (
            <li onClick={handleOpenModal}>
              <img
                src="/assets/navbar-icons/favourite-black.svg"
                alt="Logo de Favoritos"
                className="w-6 h-6"
              />
            </li>
          )}
          <li className="mx-auto">
            <Link to="/">
              <img
                src="/assets/images/logo-karokids.png"
                alt="Logo de KaroKids"
                className="w-[187px]"
              />
            </Link>
          </li>

          <Link to="/carrito">
            <li>
              <img
                src="/assets/navbar-icons/cart.svg"
                alt="Logo del carrito de compras"
                className="w-6 h-6"
              />
            </li>
          </Link>

          <li onClick={showMenu}>
            {openHamMenu === false ? (
              <img
                src="/assets/navbar-icons/ham-menu.svg"
                alt="Logo del Menú desplegable"
                className="w-6 h-6"
              />
            ) : (
              <img
                src="/assets/navbar-icons/cross.svg"
                alt="Logo del Menú desplegable"
                className="w-6 h-6 scale-[1.6]"
              />
            )}
          </li>
        </ul>
        <ul
          id="hamMenu"
          className="fixed w-screen h-screen bg-white flex flex-col items-center py-8 font-medium text-slate-400 text-2xl gap-4 transition-transform duration-300 ease-out"
          style={{
            transform: openHamMenu ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <Link to="/">
            <li onClick={() => showMenu()}>Inicio</li>
          </Link>
          {user?.roles === "admin" && (
            <Link to="/admin">
              <li className="text-slate-600">Administración</li>
            </Link>
          )}
          <li onClick={() => handleClick("recien_nacido")}>
            Recién Nacido <p className="text-center">(0-3 meses)</p>
          </li>
          <li className="text-center" onClick={() => handleClick("bebe")}>
            Bebé <p className="text-center">(3-48 meses)</p>
          </li>
          <li className="text-center" onClick={() => handleClick("infantil")}>
            Infantil <p className="text-center">(4-8 años)</p>
          </li>
          <li className="text-center" onClick={() => handleClick("junior")}>
            Junior <p className="text-center">(9-14 años)</p>
          </li>
        </ul>
        <Login
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          className={`transition-opacity duration-300 ease-in-out ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        />
        <UserModal
          className="hidden"
          isOpen={userModalOpen}
          onClose={handleCloseUser}
        />
      </div>
      <div className="mb-2 md:hidden">
        {pathname === "/productos" && <SearchBar />}
      </div>
    </nav>
  );
};

export default NavbarMobile;
