import React from "react";

const PostReviews = () => {
  return (
    <div>
      {/* puntuacion/estrellitas*/}
      <form>
        <label htmlFor="comentario">Su comentario: </label>
        <div>
          <textarea
            id="comentario"
            name="comentario"
            onChange={handleChange}
            rows={15}
            cols={40}
            placeholder="Escriba su comentario aquí..."
          />
        </div>
      </form>
      <button type="submit" onSubmit={handleSubmit}>
        Enviar
      </button>
    </div>
  );
};

export default PostReviews;
