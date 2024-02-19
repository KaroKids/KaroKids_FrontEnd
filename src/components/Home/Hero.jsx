import { Button } from "../ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              La moda veraniega por fin llegó!
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Este año, nuestra nueva colección de verano para niños te
              protegerá de los rigores del mundo, ¡con estilo y diversión
              garantizados!
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://assets.theplace.com/image/upload/w_310,f_auto,q_auto,dpr_3/ecom/assets/content/tcp/us/plp/hop_shop/boy-new.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://assets.theplace.com/image/upload/t_pdp_img_m,f_auto,q_auto,dpr_3.0/v1/ecom/assets/products/tcp/3044654/3044654_BQ.jpg"
                          alt=""
                          className="h-full w-full object-bottom"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://assets.theplace.com/image/upload/t_plp_img_m,f_auto,q_auto,dpr_3.0/v1/ecom/assets/products/tcp/3044662/3044662_1195.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="
                              https://assets.theplace.com/image/upload/t_plp_img_m,f_auto,q_auto,dpr_3.0/v1/ecom/assets/products/tcp/3043489/3043489_32M2.png"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="
                              https://assets.theplace.com/image/upload/l_ecom:assets:static:badge:pack2,g_west,w_0.22,fl_relative/t_plp_img_m,f_auto,q_auto,dpr_3.0/v1/ecom/assets/products/tcp/3038654/3038654_333I.png"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="
                              https://assets.theplace.com/image/upload/t_plp_img_m,f_auto,q_auto,dpr_3.0/v1/ecom/assets/products/tcp/3046158/3046158_136.png"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="detail"
                className="inline-block rounded-md border border-transparent px-8 py-3 text-lg text-center font-semibold text-white w-52 h-14"
              >
                Ver productos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
