import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";

const ProductDetail = () => {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  const colors = [
    { name: "Gris", value: "gray" },
    { name: "Negro", value: "black" },
    { name: "Rosa", value: "pink" },
    { name: "Blanco", value: "white" },
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  useEffect(() => {
    // Aquí harías una solicitud HTTP para obtener los detalles del producto
    // Puedes usar librerías como axios o fetch para hacer la solicitud
    // y actualizar el estado del componente con los datos recibidos
    // Por simplicidad, asumiremos que ya tienes los datos del producto
    const productoData = {
      nombre: "REMERA COLLARCITO NEGRO NENE",
      precio: 6.626,
      descripcion:
        "Remera de jersey liviano rayado manga corta con cuello a tono. Estampa central. Composición: 100% Algodón",
      imagen:
        "https://acdn.mitiendanube.com/stores/867/057/products/38505-negro1-be14996f533be78dfd16715396766743-1024-1024.webp",
    };

    setProducto(productoData);
    setCargando(false);
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar el producto.</p>;
  }

  return (
    <div className="min-h-screen py-4 px-4 text-center xl:flex xl:items-center ">
      <div className="px-2 py-8 text-center xl:grid xl:grid-cols-2 xl:h-[750px] xl:place-items-center xl:pr-40">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-96 w-full object-center mx-auto overflow-hidden shadow-lg md:w-96 xl:w-[550px] xl:h-[580px] xl:mr-20"
        />
        <div className="xl:flex flex-col xl:mr-16">
          <h2 className="text-slate-500 font-medium mt-2 text-lg text-center md:text-center xl:text-left xl:text-2xl">
            {producto.nombre}
          </h2>
          <span className="text-xs text-slate-500 px-4 xl:text-left mt-2">
            Inicio
          </span>
          <p className="text-slate-500 font-medium my-2 text-4xl text-left md:text-center xl:text-left xl:font-semibold">
            ${producto.precio}
          </p>

          <div className="border-t-2 border-gray-100 px-4 py-2 xl:w-full xl:mr-96 xl:border-gray-200 xl:py-0 xl:pt-4">
            <p className="text-sm md:text-base xl:text-xl">
              {producto.descripcion}
            </p>
            <h2 className="mt-4 mb-2 xl:text-left">Tallas disponibles:</h2>
            <div className="xl:flex justify-start">
              <Combobox />
            </div>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-2 mt-6 border-t-2 border-gray-100 py-4 w-full xl:grid-cols-1 xl:place-items-start xl:text-left xl:mb-0 xl:border-gray-200 ">
            <label>CANTIDAD:</label>
            <input
              type="text"
              className="border-gray-200 border-2 focus:outline-none w-14 h-10 text-center xl:w-20 xl:mb-6"
            />
            <label>Elige un color:</label>
            <div className="flex flex-row flex-nowrap xl:flex my-2">
              {colors.map((color) => (
                <div
                  key={color.value}
                  className={`w-8 h-6 bg-blue-500 rounded-full mx-1 my-2 cursor-pointer border ${
                    selectedColor === color.value ? "border-sky-500" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorChange(color.value)}
                ></div>
              ))}
            </div>
          </div>
          <Button variant="detail" className="mt-2 w-full">
            AGREGAR AL CARRITO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
