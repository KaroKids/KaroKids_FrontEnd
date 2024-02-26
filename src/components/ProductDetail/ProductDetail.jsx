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
import { Card } from "@/components/ui/card";
import ServicesDetail from "../Services/ServicesDetail";
import Carrousel from "../Home/Carrousel";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById, modifyVolverFunc } from "@/redux/productosActions";
import { addToCarrito } from "@/redux/carritoSlice";

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setselectedQuantity] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productos.detail);
  const talla = useSelector((state) => state.carrito.talla);

  dispatch(modifyVolverFunc(1));

  const colors = [
    { name: "Gris", value: "gray" },
    { name: "Negro", value: "black" },
    { name: "Rosa", value: "pink" },
    { name: "Blanco", value: "white" },
  ];

  const handleQuantityChange = ({ target }) => {
    setselectedQuantity(target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleAddToCart = (item) => {
    const { producto_id, nombre, imagen_principal, precio } = product;
    dispatch(
      addToCarrito({ ...item, producto_id, nombre, imagen_principal, precio })
    );
  };

  useEffect(() => {
    dispatch(getProductsById(id));
    window.scroll(0, 0);
  }, []);

  const priceArray = product.precio
    ? product.precio.toString().split("")
    : product.precio;
  if (priceArray?.length > 3) {
    let aux = priceArray.pop();
    let aux2 = priceArray.pop();
    let aux3 = priceArray.pop();
    priceArray.push(".", aux3, aux2, aux);
  }

  let fixedPrice = product.precio ? priceArray.join("") : product.precio;

  return (
    <div className=" py-24 px-10 text-center">
      {product.nombre && (
        <div className="grid grid-cols-1 xl:gap-8 xl:mb-24 xl:grid-cols-2 place-items-center">
          <Carousel
            orientation="horizontal"
            className=" flex justify-center  w-[265px]  md:w-[500px] xl:w-[600px]"
          >
            <CarouselContent>
              <CarouselItem>
                <div className="xl:max-w-[708px] xl:max-h-[598px]">
                  <Card>
                    <img
                      src={product.imagen_principal}
                      alt={product.nombre}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className=" w-full h-[360px] md:h-full  xl:flex xl:gap-10 xl:object-cover xl:w-full xl:h-[598px]"
                    />
                  </Card>
                </div>
              </CarouselItem>
              {product.imagenes_secundarias.map((prod, i) => (
                <CarouselItem key={i}>
                  <div className="xl:max-w-[598px] xl:max-h-[598px] ">
                    <Card>
                      <img
                        src={prod}
                        alt={product.nombre}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="w-full h-[360px] md:h-full xl:flex xl:gap-10 xl:object-cover xl:w-full xl:h-[598px]"
                      />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="grid grid-rows-1 xl:place-items-start w-full ">
            <h2 className="text-slate-500 font-medium mt-4 mb-2 sm:my-4 text-2xl text-center sm:text-3xl md:text-center xl:my-2 xl:pl-6 xl:text-left xl:text-2xl">
              {product.nombre}
            </h2>
            <div className="">
              <Link to="/">
                <span className="text-xs text-slate-500 pr-2 xl:pl-6 xl:text-left mt-2">
                  Inicio /
                </span>
              </Link>

              <Link to="/productos">
                <span className="text-xs text-slate-500 xl:text-left mt-2">
                  Productos
                </span>
              </Link>
            </div>
            <p className="text-slate-500 font-medium my-4 text-4xl text-center xl:pl-6 xl:text-left xl:font-semibold">
              COP ${fixedPrice}
            </p>
            <div className=" w-full border-t-2 border-gray-100 px-4 py-4 xl:border-gray-200 xl:py-0 xl:pt-0">
              <p className="text-sm md:text-base xl:text-lg xl:mt-4">
                {product.descripcion}
              </p>
              <h2 className="mt-4 mb-2 xl:text-left">Tallas disponibles:</h2>
              <div className="xl:flex justify-start">
                <Combobox />
              </div>
            </div>
            <div className="grid grid-rows-2 place-items-center py-2  w-full border-t-2 border-gray-100 xl:mt-4 xl:grid xl:place-items-start xl:border-gray-200  ">
              <label>Cantidad:</label>
              <input
                type="text"
                className="border-gray-200 border-2 focus:outline-none w-14 h-10 text-center xl:w-24 mb-4 "
                onChange={handleQuantityChange}
              />
              <label>Color:</label>
              <div className="flex flex-row ">
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
            <Link to={"/carrito"}>
              <Button
                variant="detail"
                className="my-2 w-full xl:mt-0 "
                onClick={() =>
                  handleAddToCart({
                    usuario_id: "",
                    compra_talla: talla,
                    compra_color: selectedColor,
                    compra_cantidad: selectedQuantity,
                  })
                }
              >
                AGREGAR AL CARRITO
              </Button>
            </Link>
          </div>
        </div>
      )}
      <ServicesDetail />
      <Carrousel />
    </div>
  );
};

export default ProductDetail;
