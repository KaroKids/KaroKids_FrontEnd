import { Button } from "../ui/button";

const ProductCart = ({ products }) => {
  return (
    <article
      id="table"
      className="py-4 w-full grid place-items-center text-slate-400 text-xl font-medium"
    >
      <nav className="w-full grid grid-cols-4 text-base sm:text-2xl">
        <h4 className="w-full pb-4 border-b-2 border-t-slate-300 text-center">
          Producto
        </h4>
        <h4 className="w-full pb-4 border-b-2 border-t-slate-300 text-center">
          Precio
        </h4>
        <h4 className="w-full pb-4 border-b-2 border-t-slate-300 text-center">
          Cantidad
        </h4>
        <h4 className="w-full pb-4 border-b-2 border-t-slate-300 text-center">
          Total
        </h4>
      </nav>
      <div className="h-[400px] style-scrollbar overflow-y-auto remove-scroll w-full grid grid-cols-4 place-items-center gap-y-4 py-4">
        {products.map((product) => {
          return (
            <>
              <div id="productMain" className="flex items-center gap-x-4">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-28 h-28"
                />
                <p className="hidden sm:flex flex-col gap-1 text-xl">
                  <strong>{product.name}</strong>
                  <p className="flex flex-col text-sm">
                    <span>
                      <strong>Color:</strong> {product.color}
                    </span>
                    <span>
                      <strong>Talle:</strong> {product.talle}
                    </span>
                  </p>
                </p>
              </div>
              <div id="price">$ {product.price}</div>
              <form
                id="counter"
                className="place-items-center flex gap-x-0 sm:gap-x-4"
              >
                <Button variant="detail" className="w-1 h-1 sm:w-10 sm:h-10">
                  -
                </Button>
                <input
                  className="remove-arrow w-4 h-10 text-center"
                  type="number"
                  value={product.quantity}
                />
                <Button variant="detail" className="w-1 h-1 sm:w-10 sm:h-10">
                  +
                </Button>
              </form>
              <div id="total">$ {product.price * product.quantity}</div>
            </>
          );
        })}
      </div>
    </article>
  );
};

export default ProductCart;
