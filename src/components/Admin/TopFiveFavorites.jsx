
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import IsLoading from "./IsLoading";
import axios from "axios";
 
const URL_FAVORITES = import.meta.env.VITE_URL_FAVORITES;


 const options = {
  chart: {
    title: "Productos Favoritos de KaroKids",
    subtitle: "Top 5 de Productos Favoritos",
  },
};


export default function CompanyPerformance() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchProductos = async () => {
        try {
          const body = {
            top:5
          }
            const response = await axios.get(`${URL_FAVORITES}/top`,body);
             
            if (response.data) {
                //setProductos(response.data);
                setLoading(false)

             // Modificar la estructura de los datos
              let countFive=0;
              const formattedData = [["Productos", "Favoritos"]];
              response.data.forEach(item => {
                countFive++;
                const nombreProducto = item.producto.nombre;
                const cantidad = Number(item.cantidad);
                const precio = Number(item.producto.precio);
                
                if(countFive<=5)
                formattedData.push([nombreProducto, cantidad]);
              });

              // Establecer los datos en el estado
              setData(formattedData);

            }
        } catch (error) {
            console.log('No fue posible cargar los productos', error);
            setLoading(false)
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