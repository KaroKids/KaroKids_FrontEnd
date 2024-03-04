import { useAuth } from "@/context/AuthContext";
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "@/redux/favoritosActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
  const [isFav, setIsFav] = useState(false);
  const usuario = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      myFavorites &&
        myFavorites?.map((fav) => {
          if (fav.producto_id === id) {
            setIsFav(true);
          }
        });
    }
  }, [myFavorites]);

  function handleFavorite() {
    let usuario_id = usuario.usuario_id;
    let producto_id = id;
    const fav = {
      usuario_id,
      producto_id,
    };

    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(fav));
    } else {
      if (auth.user) {
        setIsFav(true);
        dispatch(addFavorite(fav));
      } else {
        Toast.fire({
          icon: "error",
          title: "Ingresar para añadir favoritos.",
        });
      }
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
    <div key={id} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <div className="flex justify-end bg-white ">
          {isFav && auth.user ? (
            <button onClick={handleFavorite}>❤️</button>
          ) : (
            <button onClick={handleFavorite}>🤍</button>
          )}
        </div>
        <Link to={`/producto/detalle/${id}`}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-80 w-full object-cover object-center group-hover:opacity-75"
          />
        </Link>
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${fixedPrice}</p>
    </div>
  );
};

export default ProductCard;
