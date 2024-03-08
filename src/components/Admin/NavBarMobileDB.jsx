import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import Login from "../Auth/Login";
import UserModal from "../User/UserModal";
import { useAuth } from "@/context/AuthContext";
import { useSelector } from "react-redux";
import Stats from './Stats'
import  ProductsView from './ProductsView';
import UsersView from './UsersView';
import CreateProduct from '../CreateProduct/CreateProduct';
import EditProduct from '@/components/CreateProduct/EditProduct';
import Orders from "./Orders";

const NavBarMobile = ({updateMenuSelected}) => {
	const handleMenuSelect = (e,menuName) => {
		const menu=menuName;
	   //console.log('handle navig', menu)
		// Actualizar la variable navigation
	   const updatedNavigation = navigation.map((item) => {
		 if (item.name === menu) {
			updateMenuSelected({menu:menu, component:item.component});
		   return { ...item, current: true };
		 } else {
		   return { ...item, current: false };
		 }
	   });
	   //setOpenHamMenu(false)
	   setNavigation(updatedNavigation);
	  
	   
	  };
	
	 
	
	 
	
	const [navigation, setNavigation] = useState([
		{ name: 'Admin', component: <Stats updateMenuSelected={updateMenuSelected} handleMenuSelect={handleMenuSelect}   />, current: true },
		{ name: 'Usuarios', component: <UsersView />, current: false },
		{ name: 'Registrar', component: <CreateProduct />, current: false },
		{ name: 'Productos', component: <ProductsView updateMenuSelected={updateMenuSelected} />, current: false },
		{ name: '', component: <EditProduct/>, current: false },
		{ name: '', component: <Orders/>, current: false },
	]);
		
	
	useEffect(()=>{
	  updateMenuSelected({name: 'Admin', component: <Stats updateMenuSelected={updateMenuSelected} handleMenuSelect={handleMenuSelect}   />, current: true});
	},[])
		
		  

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
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

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
				  {navigation?.map((item, index)=>(

                <a
                key={index}
                className={classNames(
                item.current ? 'bg-sky-700 text-white hover:cursor-pointer' : 'text-gray-600 hover:cursor-pointer hover:bg-sky-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
                )}
                onClick={(e) => handleMenuSelect(e, item.name)}
                href="#"
                >
                {item.name}
                </a>
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
