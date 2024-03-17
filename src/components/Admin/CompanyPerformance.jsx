
import { Chart } from "react-google-charts";
import axios from "axios";
 
  
export const data = [
  ["Año", "Ventas", "Egresos", "Ganancias"],
  ["2024", 1000, 400, 200],
  // ["2015", 1170, 460, 250],
  // ["2016", 660, 1120, 300],
  // ["2017", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Performance de KaroKids",
    subtitle: "Ventas, Egresos, y Ganancias",
  },
};


export default function CompanyPerformance() {

  const [loading, setLoading]=useState(true)
  const [data, setData] = useState();
  
  
  useEffect(() => {
    const fetchOrders= async () => {
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
  
    fetchOrders();
  }, []);
  return (
    <dl className="flex flex-row shadow-xl hover:shadow-lg pl-5 mt-5 pr-5 focus:outline-none  border py-12 rounded-md justify-between sm: gap-y-6 lg:gap-y-10 text-center lg:grid-cols-3">
     
    <Chart
    chartType="Bar"
    width="100%"
    height="400px"
    data={data}
    options={options}
  />
  </dl>
  );
}