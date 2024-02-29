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
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById, modifyVolverFunc } from "@/redux/productosActions";
import { addToCarrito } from "@/redux/carritoSlice";
import { getUserByEmail } from "@/redux/userAction";
import { useContext } from "react";
import { authContext } from "@/context/AuthContext";
import { addProducto } from "@/redux/carritoActions";

const ProductDetail = () => {
  const { user } = useContext(authContext);

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
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
  const user2 = useSelector((state) => state.users.user);

  const [color, setColor] = useState([
    {
      value: "",
    },
  ]);
  const [selectedTalle, setSelectedTalle] = useState(false);
  const [selectedQuantity, setselectedQuantity] = useState(1);
  const { id } = useParams();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productos.detail);
  let stock = product.stock;

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

  const handleAddToCart = (item) => {
    const { producto_id, precio, nombre, imagen_principal } = product;
    let complementado = {
      usuario_id: item.usuario_id,
      producto_id: producto_id,
      compra_talla: item.compra_talla,
      compra_cantidad: item.compra_cantidad,
      compra_color: item.compra_color,
      producto_precio: precio,
      producto_nombre: nombre,
    };
    dispatch(addProducto(complementado));
    dispatch(
      addToCarrito({ ...item, producto_id, nombre, precio, imagen_principal })
    );

    Toast.fire({
      icon: "success",
      title: "Producto agregado al carrito",
    });
  };

  useEffect(() => {
    dispatch(modifyVolverFunc(1));
    dispatch(getProductsById(id));
    dispatch(getUserByEmail(user.email));
    window.scroll(0, 0);
    setSelectedColor("");
  }, []);

  useEffect(() => {
    const manejarCambiosDeAncho = () => {
      setAnchoPantalla(window.innerWidth);
    };
    window.addEventListener("resize", manejarCambiosDeAncho);

    return () => {
      window.removeEventListener("resize", manejarCambiosDeAncho);
    };
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
    <div className="  py-24 px-10 text-center ">
      {product.nombre ? (
        <>
          <div className="grid grid-cols-1 mb-0  xl:mb-20 xl:mt-8 xl:grid-cols-2 place-items-center">
            <Carousel
              orientation="horizontal"
              className="  rounded-sm mb-4 w-auto   md:h-[624px] xl:w-[530px]"
            >
              <CarouselContent>
                <CarouselItem>
                  <Card className="flex justify-center border-2  shadow-none mb-4 w-fit mx-auto md:w-full sm:h-[550px] md:h-[620px]">
                    <img
                      src={product.imagen_principal}
                      alt={product.nombre}
                      className=" w-auto h-full  "
                    />
                  </Card>
                </CarouselItem>
                {product.imagenes_secundarias.map((prod, i) => (
                  <CarouselItem key={i}>
                    <Card className="flex  border-2 justify-center  shadow-none w-fit mx-auto md:w-full  sm:h-[550px] md:h-[620px]">
                      <img
                        src={prod}
                        alt={product.nombre}
                        className="w-auto h-full  "
                      />
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {anchoPantalla > 767 ? (
                <>
                  <CarouselPrevious className=" mx-20 xl:mx-0" />
                  <CarouselNext className="mx-20 xl:mx-0" />
                </>
              ) : (
                <>
                  <div className="flex flex-row justify-center gap-8 mx-auto mb-6">
                    <CarouselPrevious className="left-0" />
                    <img
                      src={product.imagen_principal}
                      alt={product.nombre}
                      className=" w-auto h-10  "
                    />
                    {product.imagenes_secundarias.map((prod, i) => (
                      <img
                        src={prod}
                        alt={product.nombre}
                        className="w-auto h-10 "
                      />
                    ))}
                    <CarouselNext className="right-0 " />{" "}
                  </div>
                </>
              )}
            </Carousel>

            <div className="flex flex-col items-center xl:items-start justify-evenly w-full xl:mx-4 h-full ">
              <h2 className="text-slate-500 font-semibold text-2xl text-center sm:text-3xl">
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
              <p className="text-slate-500 font-semibold my-4  text-3xl text-center xl:my-0 xl:text-left xl:font-semibold">
                ${fixedPrice}
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
              <div className="grid grid-rows-1 place-items-center py-2  w-full border-y-2  border-gray-100  xl:grid xl:place-items-start xl:border-gray-200  ">
                <label>Cantidad:</label>
                <input
                  value={selectedQuantity}
                  type="number"
                  className="remove-arrow border-gray-200 border-2  focus:outline-none w-20 h-10 text-center xl:w-24 mt-2 mb-4 "
                  onChange={handleQuantityChange}
                />
                {selectedTalle && (
                  <>
                    <label>Color:</label>
                    <div className="flex flex-row ">
                      {color.map((color) => (
                        <div
                          key={color.value}
                          className={`w-8 h-6  rounded-full  mx-1 my-2 cursor-pointer border ${
                            selectedColor && selectedColor === color.value
                              ? "border-gray-700 border-4"
                              : "border-slate-300"
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setSelectedColor(color.value)}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
                {anchoPantalla > 1024 && (
                  <Button
                    variant="detail"
                    className="w-full"
                    onClick={() =>
                      selectedColor && selectedTalle && selectedQuantity !== 0
                        ? handleAddToCart({
                            usuario_id: user2.usuario_id,
                            compra_talla: selectedTalle,
                            compra_color: selectedColor,
                            compra_cantidad: Number(selectedQuantity),
                          })
                        : Toast.fire({
                            icon: "error",
                            title: "Falta seleccionar Talla, Color o Cantidad",
                          })
                    }
                  >
                    AGREGAR AL CARRITO
                  </Button>
                )}
              </div>
            </div>
            {anchoPantalla < 1024 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-50">
                <Button
                  variant="detail"
                  className="w-full"
                  onClick={() =>
                    selectedColor && selectedTalle && selectedQuantity !== 0
                      ? handleAddToCart({
                          usuario_id: user2.usuario_id,
                          compra_talla: selectedTalle,
                          compra_color: selectedColor,
                          compra_cantidad: Number(selectedQuantity),
                        })
                      : Toast.fire({
                          icon: "error",
                          title: "Falta seleccionar Talla, Color o Cantidad",
                        })
                  }
                >
                  AGREGAR AL CARRITO
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1  mb-10  xl:mb-20 xl:mt-8 xl:grid-cols-2 place-items-center">
            <Carousel
              orientation="horizontal"
              className=" border-2 rounded-sm mb-6 w-auto   md:h-[624px] xl:w-[600px]"
            >
              <CarouselContent>
                <CarouselItem>
                  <Card className="flex bg-gray-100 w-72 md:w-96 justify-center border-none  h-[340px] xl:w-auto md:h-[620px]">
                    <img className=" bg-gray-100 w-full" />
                  </Card>
                </CarouselItem>
              </CarouselContent>
            </Carousel>

            <div className="flex bg-gray-100  flex-col items-center xl:items-start justify-evenly w-full xl:mx-4 xl:h-[600px] ">
              <h2 className="bg-gray-300 h-6 w-full font-semibold text-2xl text-center sm:text-3xl"></h2>
              <div className="m-0">
                <span className=" bg-gray-300 w-96 h-8  "></span>

                <span className=" bg-gray-300  w-96 h-8 "></span>
              </div>
              <p className="text-slate-500 font-semibold my-4 bg-gray-300 h-12 w-full  text-3xl text-center xl:my-0 xl:text-left xl:font-semibold"></p>
              <div className=" w-full border-t-2 border-gray-100  py-4 xl:border-gray-200 xl:py-0 xl:pt-0">
                <p className="text-sm md:text-base xl:text-lg xl:mt-4"></p>
                <h2 className="mt-6 bg-gray-300 h-6 w-full  mb-2 xl:text-left"></h2>
                <div className="flex justify-center xl:justify-start gap-4"></div>
              </div>
              <div className="grid grid-rows-1 place-items-center py-2  w-full border-t-2 border-gray-100  xl:grid xl:place-items-start xl:border-gray-200  ">
                <label></label>
                <input className="bg-gray-300 remove-arrow border-gray-200 border-2 focus:outline-none w-20 h-10 text-center xl:w-24 mt-2 mb-4 " />
                <label></label>
                <div className="flex flex-row ">
                  {color.map((color) => (
                    <div style={{ backgroundColor: color.value }}></div>
                  ))}
                </div>
              </div>

              <Button className="my-2 bg-gray-300 w-full xl:mt-0 "></Button>
            </div>
          </div>
        </>
      )}
      <ServicesDetail />
      <Carrousel />
    </div>
  );
};

export default ProductDetail;
