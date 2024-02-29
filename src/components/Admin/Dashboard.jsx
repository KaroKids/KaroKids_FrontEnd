import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Stats from './Stats'
import  ProductsView from './ProductsView';
import UsersView from './UsersView';
import CreateProduct from '../CreateProduct/CreateProduct';
import { useAuth } from "@/context/AuthContext";
import DatosPersonales from '../User/DatosPersonales';
import { useLocation, useNavigate } from 'react-router-dom';


const userNavigation = [
  { name: 'Ver Pefil', href: <DatosPersonales /> },
  { name: 'Configuraciones', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const { pathname } = useLocation();
  const navigate  = useNavigate()


  const auth = useAuth();
  const { displayName,photoURL, email } = auth.user;
  const userName = displayName?.split(" ")[0];

  const [user,setUser] = useState(  {
    name: userName,
    email,
    imageUrl:photoURL
     
  })
  console.log('user logged datos:',user);
    

  const [navigation, setNavigation] = useState([
    { name: 'Dashboard', href: <Stats/>, current: true },
    { name: 'Usuarios', href: <UsersView />, current: false },
    { name: 'Registrar', href: <CreateProduct />, current: false },
    { name: 'Productos', href: <ProductsView />, current: false },
    { name: 'Reportes', href: '#', current: false },
  ]);
   const [menuSelected, setMenuSelected] = useState({
    menu:'Dashboard',
    component:<Stats />
    
   })
  

 

   const handleNavigation = (menuName) => {
     const menu=menuName.target.name;
  
     // Actualizar la variable navigation
    const updatedNavigation = navigation.map((item) => {
      if (item.name === menu) {
        setMenuSelected({menu:menu, component:item.href});
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });

    setNavigation(updatedNavigation);

    
   };

  // Este efecto se ejecutará cada vez que cambie la variable navigation
useEffect(()=>{
  console.log('menu selected useEffect:',menuSelected);
  
},[menuSelected])

useEffect(()=>{
  if (user.name===undefined && pathname==="/admin" ) {
    console.log('Reenviar a la ruta raiz')
   navigate('/');
  }
})

const handleLogout = (e) => {
  e.preventDefault();
  auth.logout();
};
  
  return (
    <>
      
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white border-2  shadow-gray-300">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-16"
                        src="/assets/images/logo-karokids.png"
                        alt="KaroKids"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <button
                            key={item.name}
                            href={item.href}
                            name={item.name}
                            className={classNames(
                              item.current
                                ? 'bg-blue-900 text-white'
                                : 'text-blue-900 hover:bg-blue-900 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={handleNavigation}
                          >
                            {item.name}
                            
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-white border border-blue-900 ring-1 p-1 text-gray-400 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6 text-blue-900" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <button
                                  name={item.name}
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    onClick={(e) => handleLogout(e)}
                                  >
                                    {item.name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                      
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                       
                     >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        
                        
      {
        menuSelected.component
      }

          </div>
          
        </main>
      </div>
    </>
  )
}