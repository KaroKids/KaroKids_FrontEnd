import { useDispatch, useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { getAllProducts } from "@/redux/productosActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Carrousel = () => {
  const productos = useSelector((state) => state.productos);

  const dispatch = useDispatch();
  let destacados = [];
  console.log(destacados);
  console.log("aca", productos);
  useEffect(() => {
    if (productos.productos.length === 0) {
      dispatch(getAllProducts());
    }
  });
  return (
    <div className="bg-white  ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Nuestros productos destacados
        </h2>

        <div className="flex justify-center items-center mt-6     ">
          {/* {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 overscroll-auto">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))} */}
          <Carousel orientation="horizontal" className="  rounded-sm my-auto">
            <CarouselContent className=" mx-2">
              {/* {productos.productos.slice(0, 6).map((prod, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={prod.imagen_principal}
                          alt={prod.nombre}
                          className="w-auto h-full"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))} */}
              {productos.productos.map((prod) => {
                if (prod.destacado) {
                  destacados.push(prod);
                }
              })}

              {destacados.slice(0, 6).map((prod) => (
                <CarouselItem
                  key={prod.id}
                  className="pl-1 basis-1/1 md:basis-1/2  w-full lg:basis-1/4"
                >
                  <div className="p-1">
                    <Link key={prod.id} to={`/producto/${prod.producto_id}`}>
                      <Card className="mx-2">
                        <CardContent className="flex flex-col mt-4 aspect-square items-center justify-center ">
                          <img
                            src={prod.imagen_principal}
                            alt={prod.nombre}
                            className="w-auto h-full"
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                  <h1 className="text-center mx-2 mt-2 font-semibold text-slate-500">
                    {prod.nombre}
                  </h1>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className=" left-0 mx-4 md:mx-10 md:mt-56 xl:mt-0 xl:mx-0" />
            <CarouselNext className=" right-0 mx-4 md:mx-10 md:mt-56 xl:mt-0 xl:mx-0" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
