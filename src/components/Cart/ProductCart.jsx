import React, { useEffect, useState, useContext, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductLS,
  increaseQuantityLS,
  decreaseQuantityLS,
} from "@/redux/carritoSlice";
import { getUserByEmail } from "@/redux/userAction";
import {
  getCartFromDB,
  deleteProductFromDB,
  updateProductInDB,
} from "@/redux/carritoActions";

import { authContext } from "@/context/AuthContext";

import { Link } from "react-router-dom";

import { Button } from "../ui/button";

const ProductCart = () => {
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
  const [dataCharged, setDataCharged] = useState(false);
  const firstRender = useRef(true);
  const { user } = useContext(authContext);
  const dispatch = useDispatch();

  const cart = user.accessToken
    ? useSelector((state) => state.carrito.cartDB)
    : useSelector((state) => state.carrito.cartLS);
  const loginUser = useSelector((state) => state.users.user);

  const handleDeleteLS = (id, talla, color) => {
    if (user.accessToken) {
      dispatch(
        deleteProductFromDB({
          usuario_id: loginUser.usuario_id,
          producto_id: id,
          compra_talla: talla,
          compra_color: color,
        })
      );
    } else {
      dispatch(deleteProductLS({ id, talla, color }));
    }
    console.log("click");
  };
  const handleIncrementarLS = (e, id, talla, color, cantidad) => {
    e.preventDefault();
    if (user.accessToken) {
      dispatch(
        updateProductInDB({
          usuario_id: loginUser.usuario_id,
          producto_id: id,
          compra_talla: talla,
          compra_color: color,
          compra_cantidad: cantidad + 1,
        })
      );
    } else {
      dispatch(increaseQuantityLS({ id, talla, color }));
    }
  };
  const handleDecrementarLS = (e, id, talla, color, cantidad) => {
    e.preventDefault();
    if (user.accessToken) {
      dispatch(
        updateProductInDB({
          usuario_id: loginUser.usuario_id,
          producto_id: id,
          compra_talla: talla,
          compra_color: color,
          compra_cantidad: cantidad - 1,
        })
      );
    } else {
      dispatch(decreaseQuantityLS({ id, talla, color }));
    }
  };

  useEffect(() => {
    const renderCart = async () => {
      if (!dataCharged && loginUser.usuario_id !== undefined) {
        const { payload } = await dispatch(getUserByEmail(user.email));
        await dispatch(getCartFromDB(payload.usuario_id));
        setDataCharged(true);
        firstRender.current = false;
      }
    };

    const manejarCambiosDeAncho = () => {
      setAnchoPantalla(window.innerWidth);
    };
    window.addEventListener("resize", manejarCambiosDeAncho);

    renderCart();
    if (cart.length >= 0) setDataCharged(true);

    return () => {
      window.removeEventListener("resize", manejarCambiosDeAncho);
    };
  }, [user, loginUser.usuario_id, dataCharged]);

  useEffect(() => {}, [cart]);

  if (!dataCharged) {
    return <p>Cargando...</p>;
  }

  return (
    <article
      id="table"
      className="py-4 w-full grid place-items-center lg:w-[600px] xl:w-[1400px] xl:flex xl:flex-col xl:items-start text-slate-400 text-xl font-medium"
    >
      <nav className="w-full   text-base  ">
        <h4 className=" text-left pb-4 mx-4 border-b-2 border-b-slate-400  xl:border-b-2 ">
          Producto/s
        </h4>
      </nav>

      <div className="h-auto  overflow-y-auto w-full md:w-auto grid grid-cols-1 place-items-center md:grid-cols-2  gap-y-4 py-4">
        {user.accessToken ? (
          cart && cart.length ? (
            cart?.map((product, i) => {
              return (
                <React.Fragment key={i}>
                  <Link key={i} to={`/producto/detalle/${product.producto_id}`}>
                    <div className="flex  justify-center  items-center h-full w-full">
                      <img
                        src={product.producto_imagen}
                        alt={product.producto_nombre}
                        className=" w-56 md:w-52 mx-10 rounded-sm mt-2 h-auto xl:w-52 "
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col px-2 gap-x-4 items-center md:flex-col border-b-2 md:border-none w-full border-slate-200 xl:w-full  xl:h-full">
                    <span
                      onClick={() =>
                        handleDeleteLS(
                          product.producto_id,
                          product.compra_talla,
                          product.compra_color
                        )
                      }
                      className="border w-6 ml-auto mr-4 text-center  mt-2 rounded md:ml-auto md:mr-4 xl:ml-[350px] cursor-pointer"
                    >
                      <img
                        src="/assets/navbar-icons/trash.svg"
                        alt="Logo basura"
                        className="w-8 h-8"
                      />
                    </span>
                    <p className=" my-2 flex flex-col items-center w-full md:justify-start md:items-start gap-1 text-xl">
                      <strong className=" text-sm">
                        <Link
                          key={i}
                          to={`/producto/detalle/${product.producto_id}`}
                        >
                          {product.producto_nombre}
                        </Link>
                      </strong>
                      <small className="flex flex-col text-sm">
                        <span>
                          <strong>Color:</strong> {product.compra_color}
                        </span>
                        <span>
                          <strong>Talla:</strong> {product.compra_talla}
                        </span>
                      </small>
                    </p>
                    <span className="text-lg md:text-xl md:w-full">
                      Precio: $
                      {product.producto_precio * product.compra_cantidad}{" "}
                    </span>
                    <form
                      id="counter"
                      className=" mt-2 md:justify-center  flex gap-x-0 sm:gap-x-4"
                    >
                      <Button
                        onClick={(e) =>
                          handleDecrementarLS(
                            e,
                            product.producto_id,
                            product.compra_talla,
                            product.compra_color,
                            product.compra_cantidad
                          )
                        }
                        variant="detail"
                        className="w-1 h-8 my-2 sm:w-10 sm:h-10 cursor-pointer"
                        disabled={product.compra_cantidad === 1}
                      >
                        -
                      </Button>

                      <input
                        className="remove-arrow border-2 mx-2 my-2 rounded-md max-w-10 w-auto md:h-10 text-center"
                        type="number"
                        value={product.compra_cantidad}
                      />
                      <Button
                        onClick={(e) =>
                          handleIncrementarLS(
                            e,
                            product.producto_id,
                            product.compra_talla,
                            product.compra_color,
                            product.compra_cantidad
                          )
                        }
                        variant="detail"
                        className="w-1 h-8 my-2 sm:w-10 sm:h-10  cursor-pointer"
                      >
                        +
                      </Button>
                    </form>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <p>Agrega productos a tu carrito</p>
          )
        ) : cart && cart.length ? (
          cart?.map((product, i) => {
            return (
              <React.Fragment key={i}>
                <Link key={i} to={`/producto/detalle/${product.producto_id}`}>
                  <div className="flex   justify-center   border-slate-200 items-center h-full w-full  xl:w-52">
                    <img
                      src={product.picture_url}
                      alt={product.title}
                      className=" w-56 md:w-52 mx-10 rounded-sm mt-2 h-auto xl:w-52 "
                    />
                  </div>
                </Link>

                <div className="flex flex-col px-2 gap-x-4 items-center md:flex-col border-b-2 md:border-none w-full border-slate-200 xl:w-full  xl:h-full">
                  <span
                    onClick={() =>
                      handleDeleteLS(
                        product.id,
                        product.compra_talla,
                        product.compra_color
                      )
                    }
                    className=" w-8 ml-auto mr-4 text-center  mt-2 rounded md:ml-auto md:mr-4 xl:ml-[350px] cursor-pointer"
                  >
                    <img
                      src="/assets/navbar-icons/trash.svg"
                      alt="Logo basura"
                      className="w-8 h-8"
                    />
                  </span>
                  <p className=" my-2 flex flex-col items-center w-full md:justify-start md:items-start gap-1 text-xl">
                    <strong className=" text-sm">
                      <Link
                        key={i}
                        to={`/producto/detalle/${product.producto_id}`}
                      >
                        {product.title}
                      </Link>
                    </strong>
                    <small className="flex flex-col text-sm">
                      <span>
                        <strong>Color:</strong> {product.compra_color}
                      </span>
                      <span>
                        <strong>Talla:</strong> {product.compra_talla}
                      </span>
                    </small>
                  </p>
                  <span className="text-lg md:text-xl md:w-full">
                    Precio: ${product.unit_price * product.quantity}{" "}
                  </span>
                  <form
                    id="counter"
                    className=" mt-2 md:justify-center  flex gap-x-0 sm:gap-x-4"
                  >
                    <Button
                      onClick={(e) =>
                        handleDecrementarLS(
                          e,
                          product.id,
                          product.compra_talla,
                          product.compra_color,
                          product.quantity
                        )
                      }
                      variant="detail"
                      className="w-1 h-8  my-2 sm:w-10 sm:h-10 cursor-pointer"
                      disabled={product.quantity === 1}
                    >
                      -
                    </Button>

                    <input
                      className="remove-arrow border-2  my-2 mx-2 rounded-md max-w-10 w-auto md:h-10 text-center"
                      type="number"
                      value={product.quantity}
                    />
                    <Button
                      onClick={(e) =>
                        handleIncrementarLS(
                          e,
                          product.id,
                          product.compra_talla,
                          product.compra_color,
                          product.quantity
                        )
                      }
                      variant="detail"
                      className="w-1 h-8  my-2 sm:w-10 sm:h-10  cursor-pointer"
                    >
                      +
                    </Button>
                  </form>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <p>Agrega productos a tu carrito</p>
        )}
      </div>
      <Link to="/productos">
        <span className="mx-6 text-sm"> ⬅ Seguir comprando </span>
      </Link>
    </article>
  );
};

export default ProductCart;
