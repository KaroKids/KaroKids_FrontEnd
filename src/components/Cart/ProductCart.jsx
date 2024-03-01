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
import { useEffect, useState } from "react";
import { deleteProducto } from "@/redux/carritoActions";
import { Link } from "react-router-dom";

const ProductCart = () => {
  const dispatch = useDispatch();
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  // if (usuario === no_registrado) {
  const productosCarrito = useSelector((state) => state.carrito.items);

  // }
  const usuario = useSelector((state) => state.users.user);

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

  const handleDelete = (
    usuario_id,
    producto_id,
    compra_talla,
    compra_color
  ) => {
    //if (usuario === no registrado) {
    dispatch(
      removeCarrito({ usuario_id, producto_id, compra_talla, compra_color })
    );
    // }

    //* if (usuario === registrado) {
    dispatch(
      deleteProducto({ usuario_id, producto_id, compra_talla, compra_color })
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
    <article
      id="table"
      className="py-4  w-full grid place-items-start md:place-items-center  xl:flex xl:flex-col xl:items-start text-slate-400 text-xl font-medium"
    >
      <nav className="w-full   text-base  ">
        <h4 className=" text-left pb-4 mx-4 border-b-2 border-b-slate-400 md:border-0 xl:border-b-2 ">
          Producto/s
        </h4>
      </nav>

      <div className="h-auto style-scrollbar  md:w-fit  overflow-y-auto remove-scroll w-full grid grid-cols-2 xl:w-fit xl:grid-cols-2 xl:place-items-center place-items-start gap-y-4 py-4">
        {productosCarrito.map((product) => {
          console.log(product);
          return (
            <>
              <div className="flex   justify-center border-t-2  border-slate-200 items-center h-full w-full xl:border-2 xl:w-52">
                <img
                  src={product.imagen_principal}
                  alt={product.nombre}
                  className="w-28 h-28 xl:w-30 xl:h-40"
                />
              </div>

              <div className="flex flex-col border-t-2 w-full  border-slate-200 xl:w-96 xl:h-full">
                <span
                  onClick={() =>
                    handleDelete(
                      usuario.usuario_id,
                      product.producto_id,
                      product.compra_talla,
                      product.compra_color
                    )
                  }
                  className="border w-6 ml-auto mr-4 text-center border-slate-300 mt-2 rounded md:ml-auto md:mr-4 xl:ml-[350px] cursor-pointer"
                >
                  🗑
                </span>
                <p className=" my-2 flex flex-col  gap-1 text-xl">
                  <strong className="text-base">{product.nombre}</strong>
                  <p className="flex flex-col text-sm">
                    <span>
                      <strong>Color:</strong> {product.compra_color}
                    </span>
                    <span>
                      <strong>Talle:</strong> {product.compra_talla}
                    </span>
                  </p>
                </p>
                $ {product.precio * product.compra_cantidad}{" "}
                <form
                  id="counter"
                  className=" mt-2 md:justify-center flex gap-x-0 sm:gap-x-4"
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
                    className="w-1 h-8 sm:w-10 sm:h-10 cursor-pointer"
                    disabled={product.compra_cantidad === 1}
                  >
                    -
                  </Button>

                  <input
                    className="remove-arrow border-2 mx-2 rounded-md max-w-10 w-auto md:h-10 text-center"
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
                    className="w-1 h-8 sm:w-10 sm:h-10  cursor-pointer"
                  >
                    +
                  </Button>
                </form>
              </div>
            </>
          );
        })}
      </div>
      <Link to="/productos">
        <span className="mx-6 text-sm"> ⬅ Seguir comprando </span>
      </Link>
    </article>
  );
};

export default ProductCart;
