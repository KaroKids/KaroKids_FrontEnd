
  import ProductsView from './ProductsView'
  import Orders from './Orders'
  import axios from 'axios'
  import { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from "react-redux";
  import clsx from 'clsx';
  import UsersView from './UsersView';
  import orderImg from '/assets/e-commerce/orders.svg'
  import spinner from '/assets/images/spinner.svg';
  import { NavLink } from 'react-router-dom';
 
  
  const URL_ORDENES = import.meta.env.VITE_URL_ORDENES;
  const URL_USERS = import.meta.env.VITE_URL_USERS;
  const URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCT;

  export default function Stats({updateMenuSelected,handleMenuSelect}) {
 

  const [totalOrdenes, setTotalOrdenes] = useState('');
  const [users, setUsers] = useState([]);
  const [productos,setProductos] = useState({})
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL_ORDENES);
        if (response && response.data) {
          setTotalOrdenes(response.data.length);
          setLoading(false);
        }
      } catch (error) {
        console.log('No fue posible cargar las ordenes', error);
      }
    };
    
    fetchData();
  }, [totalOrdenes]);
  
  
  // Función para cargar la lista de usuarios al montar el componente
	useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`${URL_USERS}`);
				// Verificar si response.data es un array antes de asignarlo a users
				if (Array.isArray(response.data)) {
          setUsers(response.data);
          setLoading(false)
				} else {
          console.log("La respuesta no es un array:", response.data);
				}
			} catch (error) {
        console.log("Error al cargar la lista de usuarios:", error);
			}
		};
    
		fetchUsuarios();
	}, []);

  useEffect(() => {
    const fetchProductos = async () => {
        try {
            const response = await axios.get(URL_PRODUCTS);
           // console.log('productos', response);

            if (response.data) {
                setProductos(response.data);
                setLoading(false)
            }
        } catch (error) {
            console.log('No fue posible cargar los productos', error);
        }
    };

    fetchProductos();
}, []);
  
     const stats = [
       { id: 1, name: 'Ordenes de compra', value: `+ ${totalOrdenes}`, component:<Orders handleMenuSelect={handleMenuSelect}  updateMenuSelected={updateMenuSelected}/>,menu:'Productos', link:'/admin/orders' } ,
       { id: 2, name: 'Clientes registrados', value: `+ ${users.length}` , component:<UsersView handleMenuSelect={handleMenuSelect}  updateMenuSelected={updateMenuSelected}/>,menu:'Usuarios', link:'/admin/users' },
       { id: 3, name: 'Productos disponibles', value: `+ ${productos.elementosPaginados?.length * productos?.totalPaginas}`, component:<ProductsView handleMenuSelect={handleMenuSelect}  updateMenuSelected={updateMenuSelected}/>,menu:'Productos', link:'/admin/products' },
     ]

   //  console.log('productos', productos)
  return (
    <div className="lg:py-[300px] py-sm-24 py-md-32 mt-10  bg-info-light">
     
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 shadow-xl hover:shadow-lg focus:outline-none  border py-12 rounded-md justify-between sm: gap-y-6 lg:gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
           <div key={stat.id} className="mx-auto item-center rounded hover:cursor-pointer  max-w-xs ring-1 ring-inset ring-black p-10 bg-blue-700 flex flex-col gap-y-4">
          
           <NavLink to={stat.link}
              // onClick={(e) => { handleMenuSelect(e, stat.menu); updateMenuSelected({ menu: stat.menu, component: stat.component }); }}
             className="text-base text-center leading-7 ring-1 py-3 p-5 ring-pink-600 hover:bg-sky-100 rounded-md hover:text-pink-500 text-white transition"
           >
             {stat.name}
          
            
           </NavLink>
          
           <dd className="order-first content-center item-center justify-center text-3xl font-semibold tracking-tight text-white border-red-500 sm:text-5xl">
                  {(!loading) ? (
                  stat.value
                ) : (
                  <img 
                    src={spinner} 
                    alt="Loading..." 
                    className=" bg-transparent rounded-lg mx-auto inset-1 flex items-center justify-center   w-11 h-11"
                  />
                )}


              
                      
           </dd>

          
         </div>
         
          
            ))}
            
          </dl>
          
        </div>
      
      </div>
      
    )
  }
  