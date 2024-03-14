
import { Chart } from "react-google-charts";
 
  
 const data = [
  ["Productos", "Favoritos", { role: "style" }],
  ["Producto 1", 2500, "green"], // RGB value
  ["Producto 2", 2000, "silver"], // English color name
  ["Producto 3", 1500, "gold"],
  ["Producto 4", 1000, "blue"], 
  ["Producto 5", 800, "red"], // CSS-style declaration
];

 const options = {
  chart: {
    title: "Productos Favoritos de KaroKids",
    subtitle: "Top 5 de Productos Favoritos",
  },
};


export default function CompanyPerformance() {
  return (
    <dl className="flex shadow-xl hover:shadow-lg pl-5 mt-5 pr-5 focus:outline-none  border py-12 rounded-md justify-between sm: gap-y-6 lg:gap-y-10 text-center lg:grid-cols-3">
   
    <Chart chartType="Bar" width="100%" height="400px" data={data} options={options} />
    </dl>
 
  );
}