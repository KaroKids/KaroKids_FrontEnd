
import { Chart } from "react-google-charts";
 
  
const data = [
  ["Clientes", "Clientes de Karokids"],
  ["Cliente 1", 11],
  ["Cliente 2", 2],
  ["Cliente 3", 2],
  ["Cliente 4", 2],
  ["Cliente 5", 7],
];

 const options = {
  
    title: "Top 5 de Clientes según ordenes de compra",
    
  
};


export default function TopFiveClientes() {
  return (
    <dl className="flex shadow-xl hover:shadow-lg pl-5 mt-5 pr-5 focus:outline-none  border py-12 rounded-md justify-between sm: gap-y-6 lg:gap-y-10 text-center lg:grid-cols-3">
   
    <Chart chartType="PieChart" width="100%" height="400px" data={data} options={options} />
    </dl>
 
  );
}