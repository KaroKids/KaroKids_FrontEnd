import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:mb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Bienvenidos a KaroKids!
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Nuestras prendas son exclusivas, elaboradas por fábricas
              calificadas donde el diseño, la calidad, la creatividad y el buen
              gusto se unen para crear MODA KAROKIDS!
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="pt-4 absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709763784/Imagenes_Productos/r36qhj1lzpunemoehdva.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709765861/Imagenes_Productos/tbzkdadkxks3zyzntziw.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709763482/Imagenes_Productos/h5yfxbz67rv0wi1a0fgt.jpg"
                          alt=""
                          className="h-full w-full object-bottom"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709675220/Imagenes_Productos/yyyg5kuddnbhjs3pjcqi.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="
                          https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709763394/Imagenes_Productos/kfexhqckttvgxbt2kasp.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="
                          https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709763330/Imagenes_Productos/utltdjs8zv8oqktub52p.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="
                          https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709791812/Imagenes_Productos/p9sfdr0qafnyo6krmrkj.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/productos">
                <Button
                  variant="detail"
                  className="inline-block rounded-md border border-transparent mt-4 px-8 py-3 text-lg text-center font-semibold lg:mt-0 text-white w-48 sm:w-52 h-14"
                >
                  Ver productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
