import { useAuth } from "@/context/AuthContext";
import { addFavorite, deleteFavorite } from "@/redux/favoritosActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user && Array.isArray(myFavorites)) {
      // Verificar si myFavorites es un array
      myFavorites.forEach((fav) => {
        // Utilizar forEach en lugar de map
        if (fav.producto_id === id) {
          setIsFav(true);
        }
      });
    }
  }, [myFavorites]);

  function handleClick(id) {
    navigate(`/producto/detalle/${id}`);
  }

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
    <div key={id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={imageSrc}
          alt={imageAlt}
          onClick={() => handleClick(id)}
          className="h-52 md:h-auto aspect-square rounded-lg object-cover object-center group-hover:opacity-75"
        />
        {/* <button
          onClick={handleFavorite}
          className="absolute top-0 right-0  p-2 "
        >
          {isFav && auth.user ? "❤️" : "🤍"}
        </button> */}
      </div>
      <h3 className="mt-4 text-xs font-semibold md:text-sm text-gray-700">
        {name}
      </h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${fixedPrice}</p>
    </div>
  );
};

export default ProductCard;
