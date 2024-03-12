import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import { useSelector } from "react-redux";

const ShowReviews = () => {
  const rating = useSelector((state) => state.productos.rating);

  return (
    <div className="flex justify-center mb-2 items-center gap-x-2">
      <span className="text-slate-500 text-xl h-6 w-7">
        {rating.promedioReal}
      </span>
      <div className="flex justify-center items-center">
        {[...Array(5)].map((_, i) => {
          const fullStar = i < Math.ceil(rating.promedioReal);
          const halfStar =
            i < Math.ceil(rating.promedioReal) &&
            i + 0.5 >= rating.promedioReal &&
            i <= Math.floor(rating.promedioReal);

          return (
            <label key={i}>
              {halfStar ? (
                <FaStarHalfAlt size={25} color="#ffc107" />
              ) : (
                <FaStar size={25} color={fullStar ? "#ffc107" : "#e4e5e9"} />
              )}
            </label>
          );
        })}
      </div>
      <span className="text-slate-500 text-xl h-6 w-7">
        ({rating.totalCalificaciones})
      </span>
    </div>
  );
};

export default ShowReviews;
