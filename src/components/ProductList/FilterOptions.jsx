
import { useState } from 'react';


function FilterOptions({ isOpen, onClose }) {

   
  const [filters, setFilters] = useState({
    beneficios: ['BENEFICIO 5%', 'BENEFICIO 10%', 'BENEFICIO 15%'],
    tipoProducto: ['TIPO 1', 'TIPO 2', 'TIPO 3', 'TIPO 4'],
    categorias: ['CATEGORIA 1', 'CATEGORIA 2', 'CATEGORIA 3'],
    tallas: ['PEQUEÑA','MEDIANA','GRANDE'],
    origen:['NACIONAL', 'INTERNACIONAL', 'OTROS'],
    temporada:['PRIMAVERA','VERANO', 'OTOÑO', 'INVIERNO'],
    colores:['NEGRO','ROJO','AZUL','BLANCO']
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };
  



  return (
    <div className={`fixed top-0 right-0 bottom-0 left-0 flex   bg-gray-800 bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-lg w-full max-w-lg lg:max-w-md xl:max-w-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">FILTROS DISPONIBLES</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>
        
          <select name="beneficios" onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full">
            
         <option value="0">BENEFICIOS</option>
        <option value="beneficio-5">BENEFICIO 5%</option>
        <option value="beneficio-10">BENEFICIO 10%</option>
        <option value="beneficio-15">BENEFICIO 15%</option>
         
      </select>
         

          <select name="tipoProducto"  onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full">
            <option value='0'  selected>TIPO PRODUCTO</option>
            <option value='tipoProducto-1'  selected>TIPO PRODUCTO 1</option>
            <option value='tipoProducto-2'  selected>TIPO PRODUCTO 2</option>
            <option value='tipoProducto-3'  selected>TIPO PRODUCTO 3</option>
            
          </select>

          <select name="categorias"  onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full">
            <option value='0' selected>CATEGORIAS</option>
            <option value='categorias-1'  selected>CATEGORIAS 1</option>
            <option value='categorias-2'  selected>CATEGORIAS 2</option>
            <option value='categorias-3'  selected>CATEGORIAS 3</option>
          </select>

          <select name="talle"  onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full">
            <option value='0'>TALLE</option>
            <option value='talle-1'  selected>TALLE 1</option>
            <option value='talle-2'  selected>TALLE 2</option>
            <option value='talle-3'  selected>TALLE 3</option>
          </select>

          <select name="origen"  onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full">
            <option value='0'  selected>ORIGEN</option>
            <option value='origen-1'  selected>ORIGEN 1</option>
            <option value='origen-2'  selected>ORIGEN 2</option>
           
          </select>

          <select name="temporada"  onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full">
            <option value='0' selected>TEMPORADA</option>
            <option value='verano'  selected>VERANO</option>
            <option value='otono'  selected>OTOÑO</option>
            <option value='invierno'  selected>INVIERNO</option>
            <option value='primavera'  selected>PRIMAVERA</option>
            

          </select>

          <select name="colores"  onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full">
            <option value='0' selected>COLORES</option>
            <option value='rojo'  selected>ROJO</option>
            <option value='blanco'  selected>BLANCO</option>
            <option value='azul'  selected>AZUL</option>
           
          </select>

        </div>
        <div className='flex justify-center space-x-4 pt-4'>
        <button className="bg-white-500 text-blue-500 hover:bg-blue-400 w-40 hover:text-white ring-2  px-4 py-2 rounded-lg focus:outline-none">Limpiar</button>
        <button className="bg-blue-500 text-white px-4 py-2 ring-2 hover:bg-white hover:text-blue-500 rounded-lg w-40 focus:outline-none ">Aplicar filtros</button>
      </div>

        </div>
    </div>
  );
}

export default FilterOptions;
