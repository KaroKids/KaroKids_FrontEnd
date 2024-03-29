import { useAuth } from "@/context/AuthContext";
import { addFavorite, deleteFavorite } from "@/redux/favoritosActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, name, imageAlt, imageSrc, price, myFavorites }) => {
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

  const auth = useAuth();
  const priceArray = price.toString().split("");
  const usuario = useSelector((state) => state.users.user);
  const favorites = useSelector((state) => state.favorites.favoritesDB);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFav =
    Array.isArray(favorites) && favorites.some((fav) => fav.producto_id === id);

  function handleClick(id) {
    navigate(`/producto/detalle/${id}`);
  }

  async function handleFavorite() {
    try {
      if (!auth.user) {
        Toast.fire({
          icon: "error",
          title: "Ingresar para añadir favoritos.",
        });
        return;
      }

      let usuario_id = usuario.usuario_id;
      let producto_id = id;
      const fav = {
        usuario_id,
        producto_id,
      };

      if (isFav) {
        await dispatch(deleteFavorite(fav));
        Toast.fire({
          icon: "success",
          title: "Producto eliminado de favoritos.",
        });
      } else {
        await dispatch(addFavorite(fav));
        Toast.fire({
          icon: "success",
          title: "Producto añadido a favoritos.",
        });
      }
    } catch (error) {
      console.log("Error al manejar el favorito:", error);
    }
  }

  if (priceArray.length > 3) {
    let aux = priceArray.pop();
    let aux2 = priceArray.pop();
    let aux3 = priceArray.pop();
    priceArray.push(".", aux3, aux2, aux);
  }

  let fixedPrice = priceArray.join("");

  return (
    <div key={id}>
      <div className="w-full overflow-hidden rounded-lg relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          onClick={() => handleClick(id)}
          className="h-auto w-full aspect-square rounded-lg object-cover object-center hover:opacity-75 cursor-pointer"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 sm:top-2 sm:right-2"
        >
          {isFav && auth.user ? (
            <img
              src="/assets/navbar-icons/favorite.svg"
              alt="Logo fav"
              className="w-6 h-6"
            />
          ) : (
            <img
              src="/assets/navbar-icons/notFavorite.svg"
              alt="Logo not fav"
              className="w-6 h-6"
            />
          )}
        </button>
      </div>
      <h3 className="mt-4 text-xs font-semibold md:text-sm text-gray-700">
        {name}
      </h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${fixedPrice}</p>
    </div>
  );
};

export default ProductCard;
