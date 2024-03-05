import { Button } from "../ui/button";
import ProductCart from "./ProductCart";
import { useEffect, useState } from "react";
import Carrousel from "../Home/Carrousel";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useSelector } from "react-redux";

const Cart = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const userLogued = useSelector((state) => state.users.user);
  const cart = userLogued.usuario_id
    ? useSelector((state) => state.carrito.cartDB)
    : useSelector((state) => state.carrito.cartLS);

  initMercadoPago("TEST-a5443a90-a45a-4830-a2c4-a2709cbae6ee", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      console.log(cart);
      const response = await axios.post(
        "https://karokids.onrender.com/payment/create-order",
        { user_id: userLogued.usuario_id, cart }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleMp = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  useEffect(() => {
    const manejarCambiosDeAncho = () => {
      setAnchoPantalla(window.innerWidth);
    };
    window.addEventListener("resize", manejarCambiosDeAncho);

    return () => {
      window.removeEventListener("resize", manejarCambiosDeAncho);
    };
  }, []);

  return (
    <article className="max-w-[1400px] w-full pt-28 md:pt-40 mx-auto">
      <header className="flex justify-between text-4xl font-semibold">
        <h2 className="text-2xl mx-2 xl:text-3xl">Mi carrito</h2>
      </header>
      <main className="flex flex-col items-center xl:flex-row md:items-center  xl:items-start">
        <ProductCart />
        <div className="flex flex-col bg-slate-100  h-56 mb-0   items-start xl:mt-20  my-4 py-4 gap-y-6 w-80 md:w-[600px] xl:justify-start xl:mx-4 xl:w-[900px] xl:h-[400px]">
          <h1 className="text-xl ml-2 font-semibold text-slate-700 text-left">
            Resumen de compra
          </h1>
          <div className="w-full ">
            <h2 className="border-t-2 h-10 mx-2 my-2 py-2 border-t-slate-500">
              Subtotal:
            </h2>
            <h2 className="border-t-2 h-10 mx-2 py-2 border-t-slate-300">
              Total
            </h2>
          </div>
          {anchoPantalla < 1024 ? (
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-xl z-50">
              <Button variant="detail" className="w-full" onClick={handleMp}>
                Completar compra
              </Button>
              {preferenceId && userLogued.usuario_id && (
                <Wallet initialization={{ preferenceId: preferenceId }} />
              )}
            </div>
          ) : (
            <>
              <Button
                variant="detail"
                className="w-full xl:my-40"
                onClick={handleMp}
              >
                Completar compra
              </Button>
              {preferenceId && (
                <Wallet initialization={{ preferenceId: preferenceId }} />
              )}
            </>
          )}
        </div>
      </main>
      <Carrousel />
    </article>
  );
};

export default Cart;
