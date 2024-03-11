import axios from "axios"
import { useEffect, useState, useTransition } from "react"
import { numberMask } from "@/utils/numberMask"
import Swal from "sweetalert2";
const URL_ORDERS = import.meta.env.VITE_URL_ORDERS;



export default function Orders() {
    const [ordenes, setOrdenes] = useState();

    const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
		customClass: {
			popup: "my-toast",
		},
	});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL_ORDERS);
               // console.log('orders', response);

                if(response.data){
                    setOrdenes(response.data)

                }

            } catch (error) {
                console.log('No fue posible cargar las ordenes', error);
            }
        };
    
        fetchData();
    }, []);


    
    const handleStatusPayment=(ordenID,estatus)=>{

        // Mostrar confirmación antes de activar/desactivar usuario
		Swal.fire({
			title: estatus==='pendiente' ? "Cambiar a Aprobado" : "Cambiar a Pendiente",
			text: estatus==='pendiente'
				? `¿Estás seguro de cambiar a Aprobado esta orden ${ordenID}? `
				: `¿Estás seguro de cambiar a Pendiente esta orden ${ordenID}?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: estatus=='pendiente' ? "#3085d6" : "#d33",
			cancelButtonColor: "#6c757d",
			confirmButtonText: estatus==='pendiente' ? "Aprobado" : "Pendiente",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				// Llamar a la función para activar/desactivar usuario
				//toggleUserStatus(usuarioId);
                Toast.fire({
                    icon: "info",
                    title: `Condición de pago modificado correctamente.`,
                });
			}
		});

       
        
    }
    
  return (<div className="container mx-auto">
<div className="mt-16 relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Ordenes de compras
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Lista de ordenes de compra detallado.</p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Orden ID 
                </th>
                <th scope="col" className="px-6 py-3">
                    Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                    Total
                </th>
                <th scope="col" className="px-6 py-3">
                    Condicion
                </th>
                <th scope="col" className="px-6 py-3">
                    Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Ver</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {ordenes &&
              ordenes.map((item)=>(

             <tr key={item.orden_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.orden_id}
                </th>
                <td className="px-6 py-4">
                    {item.Usuario.nombre_usuario}
                </td>
                <td className="px-6 py-4">
                    {numberMask(item.coste_total)}
                </td>
                <td className="px-6 py-4">
                    {" "}
                    {item.estado_pago==='aprobado' ? (
                        <button
                            onClick={() =>
                                handleStatusPayment(item.orden_id, true)
                            }
                            className="text-white w-22 h-6 pl-2 pr-2 w-[85px] py-x-1 rounded bg-green-500 hover:bg-white hover:text-green-500 hover:ring-1 hover:cursor-pointer">
                            Aprobado
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                handleStatusPayment(item.orden_id, false)
                            }
                            className="text-white w-22 h-6 pl-2 pr-2 w-[85px] py-x-1 rounded bg-red-500 hover:bg-white hover:text-red-500 hover:cursor-pointer">
                            Pendiente
                        </button>
                    )}
                 
                </td>
                <td className="px-6 py-4">
                {item.createdAt && (
    <>
        {new Date(item.createdAt).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'})}
        {' '}
        {new Date(item.createdAt).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}
    </>
)}
                </td>
                <td className="px-6 py-4 text-right">
                    <button href="#" onClick={()=>{item.orden_id}} className="font-medium ring-1 h-6 py-x-1 rounded w-[85px]  text-blue-600 dark:text-blue-500 hover:bg-sky-900 hover:text-white">Ver</button>
                </td>
            </tr>
                ))
            }
            
            
           
        </tbody>
    </table>
</div>

 

    </div>

  )
}
