
  import ProductsView from './ProductsView'
  import Orders from './Orders'
  import axios from 'axios'
  import { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from "react-redux";
  import clsx from 'clsx';
import UsersView from './UsersView';
  
  const URL_ORDERS = import.meta.env.VITE_URL_ORDERS;
  const URL_USERS = import.meta.env.VITE_URL_USERS;
  const URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCT;

  export default function Stats({updateMenuSelected,handleMenuSelect}) {
  const dispatch = useDispatch();

  const [totalOrdenes, setTotalOrdenes] = useState('');
  const [users, setUsers] = useState([]);
  const [productos,setProductos] = useState({})


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL_ORDERS);
       // console.log('orders', response);
        
        if(response.data){
          setTotalOrdenes(response.data.length)
          
        }
        
      } catch (error) {
        console.log('No fue posible cargar las ordenes', error);
      }
    };
    
    fetchData();
    
    //console.log('prod', Object.keys(productos).length)
  }, [totalOrdenes]);
  
  // Función para cargar la lista de usuarios al montar el componente
	useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`${URL_USERS}`);
				// Verificar si response.data es un array antes de asignarlo a users
				if (Array.isArray(response.data)) {
          setUsers(response.data);
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
            }
        } catch (error) {
            console.log('No fue posible cargar los productos', error);
        }
    };

    fetchProductos();
}, []);
  
     const stats = [
       { id: 1, name: 'Ordenes de compra', value: `+ ${totalOrdenes}`, component:<Orders handleMenuSelect={handleMenuSelect}  updateMenuSelected={updateMenuSelected}/>,menu:'Productos' } ,
       { id: 2, name: 'Clientes registrados', value: `+ ${users.length}` , component:<UsersView handleMenuSelect={handleMenuSelect}  updateMenuSelected={updateMenuSelected}/>,menu:'Usuarios' },
       { id: 3, name: 'Productos disponibles', value: `+ ${productos.elementosPaginados?.length * productos?.totalPaginas}`, component:<ProductsView handleMenuSelect={handleMenuSelect}  updateMenuSelected={updateMenuSelected}/>,menu:'Productos' },
     ]

   //  console.log('productos', productos)
  return (
    <div className="py-[300px] py-sm-24 py-md-32  bg-info-light">
     
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 shadow-xl hover:shadow-lg focus:outline-none  border py-12 rounded gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto rounded hover:cursor-pointer  flex max-w-xs ring-1 ring-inset ring-black p-10 bg-blue-300 flex-col gap-y-2">
                <dt onClick={(e)=>{handleMenuSelect(e,stat.menu),updateMenuSelected({menu:stat.menu, component:stat.component })}} className="text-base leading-7 text-gray-900 transition">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          
        </div>
       
      </div>
      
    )
  }
  