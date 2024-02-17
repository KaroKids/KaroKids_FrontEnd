import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "@react-hook/media-query";
import ServicesDetail from "../Services/ServicesDetail";
import Carrousel from "../Home/Carrousel";

const ProductDetail = () => {
  const [producto, setProducto] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const colors = [
    { name: "Gris", value: "gray" },
    { name: "Negro", value: "black" },
    { name: "Rosa", value: "pink" },
    { name: "Blanco", value: "white" },
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };
  useEffect(() => {
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

  return (
    <div className=" py-6 px-4 text-center">
      <div className="px-2 py-14 text-center xl:grid xl:grid-cols-1 xl:h-[750px]">
        <div
          className={
            !isMobile
              ? "flex xl:flex-row xl:gap-6  xl:items-center lg:mx-20 "
              : " flex-center"
          }
        >
          <div className="px-10 ">
            <Carousel
              orientation="horizontal"
              className="xl:w-[600px] xl:shadow-lg"
            >
              <CarouselContent>
                {Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div>
                      <Card>
                        <CardContent className="p-6">
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={`h-70 ${
                              isZoomed ? "transform scale-125" : ""
                            } 
             transition-transform duration-300`}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="xl:flex flex-col  ">
            <h2 className="text-slate-500 font-medium mt-4 text-lg text-center sm:text-3xl md:text-center xl:pl-6 xl:text-left xl:text-2xl">
              {producto.nombre}
            </h2>
            <span className="text-xs text-slate-500 px-4 xl:pl-6 xl:text-left mt-2">
              Inicio
            </span>
            <p className="text-slate-500 font-medium my-4 text-4xl text-left  md:text-center xl:pl-6 xl:text-left xl:font-semibold">
              ${producto.precio}
            </p>

            <div className="border-t-2 border-gray-100 px-4 py-2 xl:w-full xl:border-gray-200 xl:py-0 xl:pt-0">
              <p className="text-sm md:text-base xl:text-lg xl:mt-4">
                {producto.descripcion}
              </p>
              <h2 className="mt-4 mb-2 xl:text-left">Tallas disponibles:</h2>
              <div className="xl:flex justify-start">
                <Combobox />
              </div>
            </div>
            <div className="grid grid-cols-2 place-items-center gap-2 mt-6 border-t-2 border-gray-100 py-4 w-full xl:grid-cols-1 xl:place-items-start xl:mb-0 xl:border-gray-200 xl:pl-4 ">
              <label>CANTIDAD:</label>
              <input
                type="text"
                className="border-gray-200 border-2 focus:outline-none w-14 h-10 text-center xl:w-24 xl:mb-6"
              />
              <label>Elige un color:</label>
              <div className="flex flex-row flex-nowrap my-0">
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
            <Button variant="detail" className="my-2 w-full xl:mt-0 ">
              AGREGAR AL CARRITO
            </Button>
          </div>
        </div>
      </div>
      <ServicesDetail />
      <Carrousel />
    </div>
  );
};

export default ProductDetail;
