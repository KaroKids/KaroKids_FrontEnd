import { useState, useEffect } from "react";
import Login from "../Auth/Login";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UserModal from "../User/UserModal";
import { useSelector } from "react-redux";
import Stats from './Stats'
import  ProductsView from './ProductsView';
import UsersView from './UsersView';
import CreateProduct from '../CreateProduct/CreateProduct';
import EditProduct from '@/components/CreateProduct/EditProduct';

const NavBarDesktopDB = ({updateMenuSelected}) => {


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

   setNavigation(updatedNavigation);

   
  };

 

 

const [navigation, setNavigation] = useState([
    { name: 'Admin', component: <Stats updateMenuSelected={updateMenuSelected} handleMenuSelect={handleMenuSelect}   />, current: true },
    { name: 'Usuarios', component: <UsersView />, current: false },
    { name: 'Registrar', component: <CreateProduct />, current: false },
    { name: 'Productos', component: <ProductsView updateMenuSelected={updateMenuSelected} />, current: false },
    { name: '', component: <EditProduct/>, current: false },
]);
    

useEffect(()=>{
  updateMenuSelected({name: 'Admin', component: <Stats updateMenuSelected={updateMenuSelected} handleMenuSelect={handleMenuSelect}   />, current: true});
},[])
    
      
    
 
     
  const auth = useAuth();
  const { displayName,photoURL } = auth.user;
  const userName = displayName?.split(" ")[0];
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
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

  const user = useSelector((state) => state.users.user);
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <nav className="hidden h-20 max-w-screen bg-white px-10 xl:px-40 md:flex items-center gap-2 shadow-md shadow-gray-300 fixed z-10 top-0 w-full">
      <ul className="flex gap-x-5 items-center flex-wrap font-medium md:max-w-[35%]">
     
        <li className="flex gap-3 items-center">
           

            {navigation?.map((item)=>(

                <a
                key={item.name}
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
        
        {userName ? (
          <li
            onClick={handleOpenUser}
            className="flex flex-row gap-x-3 items-end cursor-pointer"
          >
            <img
              src={photoURL}
              alt="Logo usuarios"
              className="inline-block h-8 w-8 rounded-full ring-2 ring-sky-500"
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

        <li className="cursor-pointer">
          <img
            src="/assets/navbar-icons/fav-blue.svg"
            alt="Logo de Favoritos"
            className="w-6 h-6"
          />
        </li>
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
    </nav>
  );
};

export default NavBarDesktopDB;
