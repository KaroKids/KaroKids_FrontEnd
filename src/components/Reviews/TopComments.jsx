import { useSelector, useDispatch } from "react-redux";
import { getAllCommentsByProduct } from "@/redux/productosActions";
import { FaStar } from "react-icons/fa";

const TopComments = () => {
  const comments = useSelector((state) => state.productos.comments);
  const product = useSelector((state) => state.productos.detail);
  const dispatch = useDispatch();

  const allCommentsHandler = () => {
    dispatch(getAllCommentsByProduct(product.producto_id));
  };

  return (
    <section className="w-full text-left pt-4">
      <h3 className="text-2xl font-bold">Opiniones destacadas</h3>
      <article>
        {comments.map((comment) => {
          const fecha = new Date(comment.createdAt);
          const opciones = { year: "numeric", month: "long", day: "numeric" };
          const fechaFixed = fecha.toLocaleDateString("es-ES", opciones);

          return (
            <div className="my-4 p-4 flex flex-col gap-y-2 border rounded-sm ">
              <article className="flex justify-between items-center">
                <div className="flex justify-center items-center">
                  {[...Array(5)].map((_, i) => {
                    const fullStar = i < Math.ceil(comment.puntuacion);

                    return (
                      <label key={i}>
                        <FaStar
                          size={15}
                          color={fullStar ? "#ffc107" : "#e4e5e9"}
                        />
                      </label>
                    );
                  })}
                </div>
                <span className="text-sm">{fechaFixed}</span>
              </article>
              <p> {comment.comentario}</p>
            </div>
          );
        })}
      </article>
      <span
        onClick={allCommentsHandler}
        className="text-sm text-sky-500 cursor-pointer"
      >
        Ver todos los comentarios...
      </span>
    </section>
  );
};

export default TopComments;
