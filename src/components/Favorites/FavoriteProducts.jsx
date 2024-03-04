import React from "react";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { getUserByEmail } from "@/redux/userAction";

import { getFavorites, deleteFavorite } from "@/redux/favoritosActions";

const FavoriteProducts = () => {
  const { user } = useContext(authContext);

  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.users.user);
  const favorites = useSelector((state) => state.favorites.favoritesDB);

  const [dataCharged, setDataCharged] = useState(false);

  useEffect(() => {
    const renderFavorites = async () => {
      if (!dataCharged && loginUser.usuario_id !== undefined) {
        const { payload } = await dispatch(getUserByEmail(user.email));
        dispatch(getFavorites(payload.usuario_id));
        setDataCharged(true);
      }
    };

    if (favorites.length > 0) setDataCharged(true);

    const manejarCambiosDeAncho = () => {
      setAnchoPantalla(window.innerWidth);
    };

    window.addEventListener("resize", manejarCambiosDeAncho);

    renderFavorites();
    return () => {
      window.removeEventListener("resize", manejarCambiosDeAncho);
    };
  }, [user, loginUser.usuario_id, dataCharged]);

  useEffect(() => {}, [favorites]);

  const handleDeleteFavorite = (producto_id) => {
    if (loginUser.usuario_id !== undefined) {
      dispatch(
        deleteFavorite({
          usuario_id: loginUser.usuario_id,
          producto_id: producto_id,
        })
      );
    }
  };

  return (
    <article className="max-w-[1400px] min-h-screen w-full pt-28 mx-auto">
      <header className="flex justify-between text-4xl font-semibold">
        <h2 className="text-2xl mx-6 xl:text-3xl">Mis Favoritos</h2>
      </header>

      <div className="h-auto style-scrollbar  md:w-fit  overflow-y-auto remove-scroll w-full grid grid-cols-2 xl:w-fit xl:grid-cols-2 xl:place-items-center place-items-start gap-y-4 py-4">
        {user.accessToken ? (
          favorites && favorites.length ? (
            favorites &&
            favorites?.map((producto, i) => {
              return (
                <React.Fragment key={i}>
                  <Link
                    key={i}
                    to={`/producto/detalle/${producto.producto_id}`}
                  >
                    <div className="flex   justify-center border-t-2  border-slate-200 items-center h-full w-full xl:border-2 xl:w-52">
                      <img
                        src={producto.imagen_principal}
                        alt={producto.nombre}
                        className="w-28 h-28 xl:w-30 xl:h-40"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col border-t-2 w-full  border-slate-200 xl:w-96 xl:h-full">
                    <span
                      onClick={() => handleDeleteFavorite(producto.producto_id)}
                      className="border w-6 ml-auto mr-4 text-center border-slate-300 mt-2 rounded md:ml-auto md:mr-4 xl:ml-[350px] cursor-pointer"
                    >
                      🗑
                    </span>
                    <p className=" my-2 flex flex-col  gap-1 text-xl">
                      <strong className="text-base">
                        <Link
                          key={i}
                          to={`/producto/detalle/${producto.producto_id}`}
                        >
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
          <p>
            Debes iniciar sesión para poder visualizar tus productos favoritos
          </p>
        )}
      </div>
      <Link to="/productos">
        <span className="mx-6 text-sm"> ⬅ Seguir comprando </span>
      </Link>
    </article>
  );
};

export default FavoriteProducts;
