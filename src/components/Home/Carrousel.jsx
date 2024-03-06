import { useDispatch, useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { getDestacados } from "@/redux/productosActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetFiltering } from "@/redux/productosSlice";

const Carrousel = () => {
  const destacados = useSelector((state) => state.productos.destacados);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/producto/detalle/${id}`);
    window.location.reload();
  };

  useEffect(() => {
    if (destacados.length === 0) {
      dispatch(getDestacados());
    }
    dispatch(resetFiltering());
  });
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className=" text-lg text-center md:text-left md:text-2xl font-bold tracking-tight text-gray-900">
          Nuestros productos destacados
        </h2>

        <div className="flex justify-center items-center mt-6">
          <Carousel orientation="horizontal" className="rounded-sm mt-2">
            <CarouselContent className="mx-auto">
              {destacados.map((prod) => (
                <CarouselItem
                  key={prod.producto_id}
                  className="pl-1 w-[45px]  md:w-auto md:basis-1/2 lg:basis-1/4 "
                >
                  <div className="p-1">
                    <Card
                      className="mx-2 border-none shadow-none "
                      onClick={() => {
                        handleNavigate(prod.producto_id);
                      }}
                    >
                      <CardContent className="flex   flex-col pt-4 aspect-square items-center justify-center">
                        <img
                          src={prod.imagen_principal}
                          alt={prod.nombre}
                          className="w-auto h-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                  <h1 className="text-center mx-2 mt-2 font-semibold text-slate-500">
                    {prod.nombre}
                  </h1>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 mx-4 md:mx-10 md:mt-56 xl:mt-0 xl:mx-0" />
            <CarouselNext className="right-0 mx-4 md:mx-10 md:mt-56 xl:mt-0 xl:mx-0" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
