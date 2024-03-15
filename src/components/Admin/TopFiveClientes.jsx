
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import axios from "axios";
import IsLoading from "./isLoading";
 
const URL_USERS = import.meta.env.VITE_URL_USERS;

 const options = {
  
    title: "Top 5 de Clientes según órdenes de compra",
    
  
};


export default function TopFiveClientes() {
  const [loading, setLoading]=useState(true)
  const [data, setData] = useState();
  
  
  useEffect(() => {
    const fetchClientes= async () => {
        try {
          const body = {
            top:5
          }
          const response = await axios.get(`${URL_USERS}/top`,body);
          //console.log('TF Clientes', response.data);
  
           if (response.data) {
            //setProductos(response.data);
            setLoading(false)

         // Modificar la estructura de los datos
            let countFive=0;
            const formattedData = [["Clientes", "Top 5"]];
            response.data.forEach(item => {
            countFive++;
            const nombreItem = item.usuario.nombre_usuario.charAt(0).toUpperCase() + item.usuario.nombre_usuario.slice(1) + ' ' + item.usuario.apellido_usuario.charAt(0).toUpperCase() + item.usuario.apellido_usuario.slice(1);
            const cantidad = Number(item.cantidad);
            
            
            if(countFive<=5)
            formattedData.push([nombreItem, cantidad]);
          });

          // Establecer los datos en el estado
          setData(formattedData);

        }
        } catch (error) {
             setLoading(false)
            console.log('No fue posible cargar los clientes Top Five', error);
        }
    };
  
    fetchClientes();
  }, []);
  return (
    <dl className="flex shadow-xl hover:shadow-lg pl-5 mt-5 pr-5 focus:outline-none  border py-12 rounded-md justify-between sm: gap-y-6 lg:gap-y-10 text-center lg:grid-cols-3">
     {(!loading) ? (
                 <Chart chartType="PieChart" width="100%" height="400px" data={data} options={options} />
                ) : (
                  <IsLoading/>
                )}
     </dl>
 
  );
}