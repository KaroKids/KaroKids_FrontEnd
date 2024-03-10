import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ShowReviews = ({ rating }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {[...Array(5)].map((_, i) => {
        const fullStar = i < Math.floor(rating);
        const halfStar = i === Math.floor(rating) && rating % 1 !== 0;
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
  );
};

export default ShowReviews;
