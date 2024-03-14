import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { NavLink, Link, useLocation } from "react-router-dom";
import Login from "../Auth/Login";
import UserModal from "../User/UserModal";
import { useAuth } from "@/context/AuthContext";
import { useSelector } from "react-redux";
import navigation from "@/utils/navigationMenu";

const NavBarMobile = () => {
	const auth = useAuth();
	const { displayName, photoURL } = auth.user;
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
	const [adminActive, setAdminActive] = useState(true); // Estado para administrar la activación del menu Admin

	useEffect(() => {
		if (pathname !== "/admin") {
			setAdminActive(false);
		} else {
			setAdminActive(true);
		}
	}, [pathname]);

	return (
		<nav className=" py-2 fixed z-10 top-0 bg-white shadow-md shadow-gray-300 lg:hidden">
			<div className="mb-4">
				<ul className=" w-screen max-h-[50px] px-2 flex items-center gap-4">
					{userName ? (
						<li
							onClick={handleOpenUser}
							className="flex flex-row gap-x-2 items-end">
							<img
								src={photoURL}
								alt="Logo usuarios"
								className="inline-block h-8 w-8 rounded-full ring-2 ring-sky-500"
							/>
						</li>
					) : (
						<li
							onClick={handleOpenModal}
							className="flex flex-row gap-x-2 items-end">
							<img
								src="/assets/navbar-icons/user-black.svg"
								alt="Logo usuarios"
								className="inline-block h-8 w-8 rounded-full ring-2 ring-sky-500"
							/>
							<p className="text-sm">Hola, {userName}</p>
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
					<NavLink
						to="/admin"
						className={
							adminActive
								? "bg-sky-700 text-white hover:cursor-pointer rounded-md px-3 py-2 text-sm font-medium"
								: "text-gray-600 hover:cursor-pointer hover:bg-sky-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
						}>
						Admin
					</NavLink>

					{navigation?.map((item) => (
						<NavLink
							to={item.link}
							key={item.name}
							className={({ isActive }) =>
								isActive
									? "bg-sky-700 text-white hover:cursor-pointer rounded-md px-3 py-2 text-sm font-medium"
									: "text-gray-600 hover:cursor-pointer hover:bg-sky-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
							}
							onClick={() => {
								if (item.name === "Admin") {
									setAdminActive(!adminActive);
								} else {
									setAdminActive(false);
								}
							}}>
							{item.name}
						</NavLink>
					))}
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

export default NavBarMobile;
