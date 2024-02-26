import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import ServicesDetail from "../Services/ServicesDetail";
import Swal from "sweetalert2";
import Carrousel from "../Home/Carrousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById, modifyVolverFunc } from "@/redux/productosActions";
import { addToCarrito } from "@/redux/carritoSlice";

const ProductDetail = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: "my-toast",
    },
  });

  const [selectedColor, setSelectedColor] = useState(false);
  const [color, setColor] = useState([
    {
      value: "",
    },
  ]);
  const [selectedTalle, setSelectedTalle] = useState(false);
  const [selectedQuantity, setselectedQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productos.detail);
  let stock = product.stock;

  dispatch(modifyVolverFunc(1));

  const handleQuantityChange = ({ target }) => {
    setselectedQuantity(target.value);
  };

  const handleTalleyColor = (key, values) => {
    setSelectedTalle(key);
    const newColors = values.map((info) => {
      if (info.color) {
        return { value: info.color };
      }
    });

    setColor(newColors);
    if (!newColors.some((color) => color.value === selectedColor)) {
      setSelectedColor(null);
    }
  };
  console.log(stock);
  const handleAddToCart = (item) => {
    const { producto_id, nombre, imagen_principal, precio } = product;
    dispatch(
      addToCarrito({ ...item, producto_id, nombre, imagen_principal, precio })
    );
    navigate("/carrito");
  };

  useEffect(() => {
    dispatch(getProductsById(id));
    window.scroll(0, 0);
    setSelectedColor("");
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
    <div className="  py-24 px-10 text-center">
      {product.nombre && (
        <div className="grid grid-cols-1 mb-10  xl:mb-20 xl:mt-8 xl:grid-cols-2 place-items-center">
          <Carousel
            orientation="horizontal"
            className=" border-2 rounded-sm mb-6 w-auto   md:h-[624px] xl:w-[600px]"
          >
            <CarouselContent>
              <CarouselItem>
                <Card className="flex justify-center border-none w-auto h-[340px] md:h-[620px]">
                  <img
                    src={product.imagen_principal}
                    alt={product.nombre}
                    className=" w-auto h-full  "
                  />
                </Card>
              </CarouselItem>
              {product.imagenes_secundarias.map((prod, i) => (
                <CarouselItem key={i}>
                  <Card className="flex border-none justify-center w-auto h-[340px] md:h-[620px]">
                    <img
                      src={prod}
                      alt={product.nombre}
                      className="w-auto h-full "
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className=" mx-2 xl:mx-0" />
            <CarouselNext className="mx-2 xl:mx-0" />
          </Carousel>

          <div className="flex flex-col items-center xl:items-start justify-evenly w-full xl:mx-4 h-full ">
            <h2 className="text-slate-500 font-medium text-2xl text-center sm:text-3xl">
              {product.nombre}
            </h2>
            <div className="m-0">
              <Link to="/">
                <span className="text-xs text-slate-500 pr-2  xl:text-left">
                  Inicio /
                </span>
              </Link>

              <Link to="/productos">
                <span className="text-xs text-slate-500 xl:text-left ">
                  Productos
                </span>
              </Link>
            </div>
            <p className="text-slate-500 font-medium my-4  text-3xl text-center xl:my-0 xl:text-left xl:font-semibold">
              COP ${fixedPrice}
            </p>
            <div className=" w-full border-t-2 border-gray-100  py-4 xl:border-gray-200 xl:py-0 xl:pt-0">
              <p className="text-sm md:text-base xl:text-lg xl:mt-4">
                {product.descripcion}
              </p>
              <h2 className="mt-6 mb-2 xl:text-left">Tallas disponibles:</h2>
              <div className="flex justify-center xl:justify-start gap-4">
                {Object.entries(stock).map(([key, values]) => (
                  <li
                    value={values}
                    className={`flex items-center justify-center border-2 w-20 h-8 ${
                      selectedTalle === key ? "border-slate-500" : ""
                    }`}
                    onClick={() => handleTalleyColor(key, values)}
                  >
                    {key}
                  </li>
                ))}
              </div>
            </div>
            <div className="grid grid-rows-1 place-items-center py-2  w-full border-t-2 border-gray-100  xl:grid xl:place-items-start xl:border-gray-200  ">
              <label>Cantidad:</label>
              <input
                value = {selectedQuantity}
                type="text"
                className="border-gray-200 border-2 focus:outline-none w-14 h-10 text-center xl:w-24 mt-2 mb-4 "
                onChange={handleQuantityChange}
              />
              <label>Color:</label>
              <div className="flex flex-row ">
                {color.map((color) => (
                  <div
                    key={color.value}
                    className={`w-8 h-6  rounded-full  mx-1 my-2 cursor-pointer border ${
                      selectedColor && selectedColor === color.value
                        ? "border-slate-800 border-2"
                        : "border-slate-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.value)}
                  ></div>
                ))}
              </div>
            </div>

            <Button
              variant="detail"
              className="my-2 w-full xl:mt-0 "
              onClick={() =>
                selectedColor && selectedTalle
                  ? handleAddToCart({
                      usuario_id: "",
                      compra_talla: selectedTalle,
                      compra_color: selectedColor,
                      compra_cantidad: selectedQuantity,
                    })
                  : Toast.fire({
                      icon: "error",
                      title: "Falta seleccionar Talla o Color",
                    })
              }
            >
              AGREGAR AL CARRITO
            </Button>
          </div>
        </div>
      )}
      <ServicesDetail />
      <Carrousel />
    </div>
  );
};

export default ProductDetail;
