import React from "react";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getUserByEmail } from "@/redux/userAction";

import { getFavorites, deleteFavorite } from "@/redux/favoritosActions";

const FavoriteProducts = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: "my-toast",
    },
  });
  const { user } = useContext(authContext);

  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.users.user);
  const favorites = useSelector((state) => state.favorites.favoritesDB);

  const [dataCharged, setDataCharged] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
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
    Toast.fire({
      icon: "success",
      title: "Producto eliminado de favoritos.",
    });
  };

  return (
    <article className="container  flex flex-col items-center mb-4 min-h-screen w-full pt-28 mx-auto">
      <header className="flex justify-between text-4xl font-semibold">
        <h2 className="text-2xl mx-6 xl:text-3xl">Mis Favoritos</h2>
      </header>

      <div className="h-full overflow-y-auto grid grid-cols-1 md:grid-cols-4  lg:grid-cols-6 md:pl-10  lg:place-items-center gap-y-4 py-4">
        {user.accessToken ? (
          favorites && favorites.length ? (
            favorites &&
            favorites?.map((producto, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="flex flex-col border-2 relative rounded-md bg-slate-100 justify-center items-center h-auto w-72 ">
                    <div className="relative">
                      <Link
                        key={i}
                        to={`/producto/detalle/${producto.producto_id}`}
                      >
                        <img
                          src={producto.imagen_principal}
                          alt={producto.nombre}
                          className=" aspect-square h-auto"
                        />
                      </Link>
                      <span
                        onClick={() =>
                          handleDeleteFavorite(producto.producto_id)
                        }
                        className="absolute top-0 right-0 cursor-pointer"
                      >
                        <img
                          src="/assets/navbar-icons/trash.svg"
                          alt="Logo basura"
                          className="w-8 h-8"
                        />
                      </span>
                    </div>
                    <span className=" my-2 text-xl font-semibold">
                      Precio: ${producto.precio}
                    </span>

                    <h1 className=" my-2 flex flex-row font-semibold   text-xs">
                      {producto.nombre}
                    </h1>
                  </div>

                  <div className="mx-0 "></div>
                </React.Fragment>
              );
            })
          ) : (
            <p className="">Agrega productos a tus favoritos</p>
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
