
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