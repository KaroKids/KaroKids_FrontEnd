
import { Chart } from "react-google-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import IsLoading from "./isLoading";
 
const URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCT;

 const options = {
  chart: {
    title: "Productos mas vendidos en KaroKids",
    subtitle: "Top 5 de Productos",
  },
};


export default function TopProductos() {
  const [data, setData] = useState();
  const [loading, setLoading]=useState(true)
  

  useEffect(() => {
    const fetchProductos = async () => {
        try {
          const body = {
            top:5
          }
          const response = await axios.get(`${URL_PRODUCTS}/top`,body);
          
           if (response.data) {
             
            setLoading(false)

         // Modificar la estructura de los datos
            let countFive=0;
            const formattedData = [["Productos", "Top 5"]];
            response.data.forEach(item => {
              countFive++;
             
            const nombreProducto = item.producto.producto_nombre;
            const cantidad = Number(item.cantidad);
            const precio = Number(item.producto.precio);
            
            if(countFive<=5)
            formattedData.push([nombreProducto, cantidad]);
          });

          // Establecer los datos en el estado
          setData(formattedData);

        }
        } catch (error) {
             setLoading(false)
            console.log('No fue posible cargar los productos', error);
        }
    };
  
    fetchProductos();
  }, []);
  return (
    <dl className="flex shadow-xl hover:shadow-lg pl-5 mt-5 pr-5 focus:outline-none  border py-12 rounded-md justify-between sm: gap-y-6 lg:gap-y-10 text-center lg:grid-cols-3">
               {(!loading) ? (
                 <Chart chartType="Bar" width="100%" height="400px" data={data} options={options} />
                ) : (
                  <IsLoading/>
                )}
    </dl>
 
  );
}