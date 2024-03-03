import React from "react";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { getUserByEmail } from "@/redux/userAction";

import {
  allFavorites,
  postFavorite,
  putFavorite,
} from "@/redux/favoritosSlice";

import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "@/redux/favoritosActions";

const FavoriteProducts = () => {
  const { user } = useContext(authContext);
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.users.user);

  const favorites = useSelector((state) => state.favorites.favoritesDB);

  const [aux, setAux] = useState(false);

  useEffect(() => {
    const renderFavorites = async () => {
      if (loginUser.usuario_id !== undefined) {
        const { payload } = await dispatch(getUserByEmail(user.email));
        dispatch(getFavorites(payload.usuario_id));
      }
    };

    const manejarCambiosDeAncho = () => {
      setAnchoPantalla(window.innerWidth);
    };

    window.addEventListener("resize", manejarCambiosDeAncho);

    renderFavorites();
    return () => {
      window.removeEventListener("resize", manejarCambiosDeAncho);
    };
  }, [aux]);

  return (
    <article
      id="table"
      className="py-4  w-full grid place-items-start md:place-items-center  xl:flex xl:flex-col xl:items-start text-slate-400 text-xl font-medium"
    >
      <nav className="w-full   text-base  ">
        <h4 className=" text-left pb-4 mx-4 border-b-2 border-b-slate-400 md:border-0 xl:border-b-2 ">
          Mis Productos Favoritos
        </h4>
      </nav>

      <div className="h-auto style-scrollbar  md:w-fit  overflow-y-auto remove-scroll w-full grid grid-cols-2 xl:w-fit xl:grid-cols-2 xl:place-items-center place-items-start gap-y-4 py-4">
        {user.accessToken ? (
          favorites && favorites.length ? (
            favorites?.map((producto, i) => {
              return (
                <React.Fragment key={i}>
                  <Link key={i} to={`/producto/${producto.producto_id}`}>
                    <div className="flex   justify-center border-t-2  border-slate-200 items-center h-full w-full xl:border-2 xl:w-52">
                      <img
                        src={producto.imagen_principal}
                        alt={producto.nombre}
                        className="w-28 h-28 xl:w-30 xl:h-40"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col border-t-2 w-full  border-slate-200 xl:w-96 xl:h-full">
                    {/* <span
                      onClick={() =>
                        handleDeleteLS(
                          product.producto_id,
                          product.compra_talla,
                          product.compra_color
                        )
                      }
                      className="border w-6 ml-auto mr-4 text-center border-slate-300 mt-2 rounded md:ml-auto md:mr-4 xl:ml-[350px] cursor-pointer"
                    >
                      🗑
                    </span> */}
                    <p className=" my-2 flex flex-col  gap-1 text-xl">
                      <strong className="text-base">
                        <Link key={i} to={`/producto/${producto.producto_id}`}>
                          {producto.nombre}
                        </Link>
                      </strong>
                    </p>
                    $ {producto.precio}{" "}
                    <form
                      id="counter"
                      className=" mt-2 md:justify-center flex gap-x-0 sm:gap-x-4"
                    ></form>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <p>Agrega productos a tu carrito</p>
          )
        ) : (
          <p>Usuario no registrado</p>
        )}
      </div>
      <Link to="/productos">
        <span className="mx-6 text-sm"> ⬅ Seguir comprando </span>
      </Link>
    </article>
  );
};

export default FavoriteProducts;
