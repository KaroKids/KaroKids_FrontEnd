import React from "react";

const PostReviews = () => {
  return (
    <div>
      {/* puntuacion/estrellitas*/}
      <div>
        <label htmlFor="comentario">Su comentario: </label>
        <div>
          <textarea
            //id={styles.description_input}
            key="comentario"
            name="comentario"
            //value={userInput.description}
            onChange={handleChange}
            rows={15}
            cols={40}
            placeholder="Escriba su comentario aquí..."
          />
        </div>
      </div>
      <button type="submit" onSubmit={handleSubmit}>
        Publicar
      </button>
    </div>
  );
};

export default PostReviews;
