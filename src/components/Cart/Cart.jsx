import { Button } from "../ui/button";
import ProductCart from "./ProductCart";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const Cart = () => {
  return (
    <article className="max-w-[1400px] w-full pt-28 md:pt-40 mx-auto">
      <header className="flex justify-between text-4xl font-semibold mb-2">
        <h2>Mi carrito</h2>
        <Button variant="detail" className="text-base ">
          <img
            src="/public/assets/navbar-icons/back-black.svg"
            alt=""
            className="w-6 mr-2"
          />
          Volver a la tienda
        </Button>
      </header>
      <main className="mt-6 border-t-2 border-t-slate-300">
        <ProductCart />
      </main>
      <footer className="h-auto py-4 mb-6 flex flex-col sm:flex-row items-center justify-around gap-3 rounded-2xl border-2 border-slate-300">
        <div
          id="shipping"
          className="w-80 h-40 p-4 rounded-xl bg-sky-400 flex flex-col gap-4 text-white"
        >
          <h3 className="font-bold text-2xl">Elige tu envio:</h3>
          <RadioGroup
            defaultValue="comfortable"
            className="flex flex-col gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="local" id="r1" className="border-white" />
              <Label htmlFor="r1">Retiro por el local</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="domicilio"
                id="r2"
                className="border-white"
              />
              <Label htmlFor="r2">Envio a domicilio</Label>
            </div>
          </RadioGroup>
        </div>
        <div
          id="billing"
          className="w-80 h-40 p-4 rounded-xl bg-sky-400 grid grid-cols-2 gap-y-4 gap-x-8 text-white"
        >
          <h4>SUBTOTAL</h4>
          <span>$ 9000</span>
          <h4>SHIPPING</h4>
          <span>Free</span>
          <h4 className="border-t-2 border-t-slate-300">TOTAL</h4>
          <span className="border-t-2 border-t-slate-300">$ 9000</span>
        </div>
      </footer>
    </article>
  );
};

export default Cart;
