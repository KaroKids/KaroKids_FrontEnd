import coloresTailwind from "@/utils/coloresTailwind";
  
  const Colores = ({ color }) => {
    return (
      <span
        className={`inline-flex justify-center items-center px-2 py-1 rounded-md ${coloresTailwind[color].clase}  w-[90px]  py-1 text-xs ${ color === 'white' || color==='beige' || color==='yellow' ? 'text-black': 'text-white'} font-medium `}
      >
        {coloresTailwind[color].front}
      </span>
    );
  };
  
  export default Colores;
  