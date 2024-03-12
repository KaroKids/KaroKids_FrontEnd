import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { createReview } from "@/redux/userAction";

const OrderModal = ({ isOpen, onClose, usuario_id, producto_id }) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState(""); // Nuevo estado para almacenar el texto del textarea
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // Aquí puedes enviar la calificación y el comentario a tu backend o hacer lo que sea necesario
    console.log("Rating:", rating);
    console.log("Comentario:", comment);
    const body = {
      producto_id,
      usuario_id,
      puntuacion: rating,
      comentario: comment,
    };
    console.log(body);
    dispatch(createReview(body));
    // Cierra el modal después de enviar la calificación
    onClose();
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-slate-900 p-4 bg-white">
      <div className="modal">
        <header className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none "
          >
            <img
              src="/assets/navbar-icons/back.svg"
              width="24px"
              alt="logo atras"
            />
          </button>
          <h2 className="font-semibold">Calificar Producto</h2>
        </header>
        <article className="flex flex-col gap-y-3 my-4">
          <p className="font-semibold">Escribe tu comentario:</p>
          <textarea
            className="resize-none w-96 p-2 border-2 border-slate-300"
            name=""
            id=""
            cols="30"
            rows="10"
            value={comment} // Establece el valor del textarea
            onChange={(e) => setComment(e.target.value)} // Actualiza el estado cuando cambia el contenido del textarea
          ></textarea>
          <p className="font-semibold">Selecciona una calificación:</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={25}
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
        </article>
        <Button onClick={handleSubmit} variant="detail">
          Enviar Calificación
        </Button>
      </div>
    </div>
  );
};

export default OrderModal;
