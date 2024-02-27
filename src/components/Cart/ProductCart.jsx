import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementarCantidad,
  incrementarCantidad,
  removeCarrito,
  allCarrito,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  borrarCarrito,
} from "@/redux/carritoSlice";
import { useEffect } from "react";

const ProductCart = () => {
  const dispatch = useDispatch();

  // if (usuario === no_registrado) {
  const productosCarrito = useSelector((state) => state.carrito.items);
  // }

  //* if (usuario === registrado) {
  dispatch(allCarrito());
  const miCarrito = useSelector((state) => state.carrito.productos_compra);
  //* }

  const handleAdd = (id, talla, color) => {
    //if (usuario === no registrado) {}
    //* if (usuario === registrado) {
    dispatch(
      agregarProducto(
        usuario_id,
        producto_id,
        compra_talla,
        compra_color,
        compra_cantidad,
        producto_precio
      )
    );
    //* }
  };

  const handleBuy = (id, talla, color) => {
    //if (usuario === no registrado) {}
    //* if (usuario === registrado) {
    const compraFinalizada = useSelector(
      (state) => state.carrito.productos_compra
    );
    dispatch(borrarCarrito(usuario_id));
    //* }
  };

  const handleDelete = (id, talla, color) => {
    //if (usuario === no registrado) {
    dispatch(removeCarrito({ id, talla, color }));
    console.log("click");
    // }

    //* if (usuario === registrado) {
    dispatch(
      eliminarProducto(usuario_id, producto_id, compra_talla, compra_color)
    );
    //* }
  };

  const handleIncrementar = (e, id, talla, color) => {
    //if (usuario === no registrado) {
    e.preventDefault();
    dispatch(incrementarCantidad({ id, talla, color }));
    // }

    //* if (usuario === registrado) {
    dispatch(
      actualizarProducto(
        usuario_id,
        producto_id,
        compra_talla,
        compra_color,
        compra_cantidad
      )
    );
    //* }
  };

  const handleDecrementar = (e, id, talla, color) => {
    //if (usuario === no registrado) {
    e.preventDefault();
    dispatch(decrementarCantidad({ id, talla, color }));
    // }

    //* if (usuario === registrado) {
    dispatch(
      actualizarProducto(
        usuario_id,
        producto_id,
        compra_talla,
        compra_color,
        compra_cantidad
      )
    );
    //* }
  };

  useEffect(() => {}, []);

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
        {productosCarrito.map((product) => {
          return (
            <>
              <div id="productMain" className="flex items-center gap-x-4">
                <img
                  src={product.imagen_principal}
                  alt={product.nombre}
                  className="w-28 h-28"
                />
                <p className="hidden sm:flex flex-col gap-1 text-xl">
                  <strong>{product.nombre}</strong>
                  <p className="flex flex-col text-sm">
                    <span>
                      <strong>Color:</strong> {product.compra_color}
                    </span>
                    <span>
                      <strong>Talle:</strong> {product.compra_talla}
                    </span>
                  </p>
                </p>
              </div>
              <div id="price">$ {product.precio}</div>
              <form
                id="counter"
                className="place-items-center flex gap-x-0 sm:gap-x-4"
              >
                <Button
                  onClick={(e) =>
                    handleDecrementar(
                      e,
                      product.producto_id,
                      product.compra_talla,
                      product.compra_color
                    )
                  }
                  variant="detail"
                  className="w-1 h-1 sm:w-10 sm:h-10 cursor-pointer"
                  disabled={product.compra_cantidad === 1}
                >
                  -
                </Button>

                <input
                  className="remove-arrow max-w-10 w-auto h-10 text-center"
                  type="number"
                  value={product.compra_cantidad}
                />
                <Button
                  onClick={(e) =>
                    handleIncrementar(
                      e,
                      product.producto_id,
                      product.compra_talla,
                      product.compra_color
                    )
                  }
                  variant="detail"
                  className="w-1 h-1 sm:w-10 sm:h-10  cursor-pointer"
                >
                  +
                </Button>
              </form>
              <div id="total">
                $ {product.precio * product.compra_cantidad}{" "}
                <span
                  onClick={() =>
                    handleDelete(
                      product.producto_id,
                      product.compra_talla,
                      product.compra_color
                    )
                  }
                  className="border border-black p-2 rounded  cursor-pointer"
                >
                  X
                </span>
              </div>
            </>
          );
        })}
      </div>
    </article>
  );
};

export default ProductCart;
