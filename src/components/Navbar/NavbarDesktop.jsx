import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";

const NavbarDesktop = () => {
	const { pathname } = useLocation();

	return (
		<nav className="hidden h-20 max-w-screen bg-white px-10 xl:px-40 md:flex items-center gap-2 shadow-md shadow-gray-300 fixed z-10 top-0 w-full">
			<ul className="flex gap-x-5 items-center flex-wrap font-medium md:max-w-[35%]">
				<Link to="/">
					<li>Inicio</li>
				</Link>
				<li className="flex gap-1 items-center">
					Productos{" "}
					<img
						src="/assets/navbar-icons/arrow-down.svg"
						alt="Logo de busqueda"
						className="pt-1"
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
			<ul className="flex gap-2 items-center">
				{pathname === "/productos" && (
					<li>
						<SearchBar />
					</li>
				)}
				<li>
					<img
						src="/assets/navbar-icons/cart-blue.svg"
						alt="Logo del carrito de compras"
						className="w-6 h-6"
					/>
				</li>
				<li>
					<img
						src="/assets/navbar-icons/fav-blue.svg"
						alt="Logo de Favoritos"
						className="w-6 h-6"
					/>
				</li>
				<li className="text-sky-500 font-medium">
					<a href="/">Ingresar</a> / <a href="/">Registrarse</a>
				</li>
				<li className="text-sky-500 font-medium pl-4">
					<a href="/create">+</a>
				</li>
			</ul>
		</nav>
	);
};

export default NavbarDesktop;
