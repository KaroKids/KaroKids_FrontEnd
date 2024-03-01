import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import Login from "../Auth/Login";
import UserModal from "../User/UserModal";
import { useAuth } from "@/context/AuthContext";
import { useSelector } from "react-redux";

const NavbarMobile = () => {
	const auth = useAuth();
	const { displayName } = auth.user;
	const userName = displayName?.split(" ")[0];
	const [openHamMenu, setOpenHamMenu] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [userModalOpen, setUserModalOpen] = useState(false);
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
							className="flex flex-row gap-x-2 items-end">
							<img
								src="/assets/navbar-icons/user-black.svg"
								alt="Logo usuarios"
								className="w-6 h-6"
							/>
						</li>
					) : (
						<li
							onClick={handleOpenModal}
							className="flex flex-row gap-x-2 items-end">
							<img
								src="/assets/navbar-icons/user-black.svg"
								alt="Logo usuarios"
								className="w-6 h-6"
							/>
						</li>
					)}
					<li>
						<img
							src="/assets/navbar-icons/favourite-black.svg"
							alt="Logo de Favoritos"
							className="w-6 h-6"
						/>
					</li>
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
					}}>
					<Link to="/">
						<li className="text-slate-600">Inicio</li>
					</Link>
					{user?.roles === "admin" && (
						<Link to="/admin">
							<li className="text-slate-600">Administración</li>
						</Link>
					)}
					<li>Recién Nacido</li>
					<li>Bebé</li>
					<li>Infantil</li>
					<li>Junior</li>
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
