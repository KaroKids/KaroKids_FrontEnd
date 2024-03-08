import {
  getProductsByFilters,
  setFilteringActive,
} from "@/redux/productosActions";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavbarModal = ({ isOpen, onClose, className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (filtro) => {
    dispatch(setFilteringActive(true));
    dispatch(getProductsByFilters({ edad: filtro }));
    navigate("/productos");
    onClose();
  };

  return (
    <div
      className={`fixed  mt-[81px] transition-opacity duration-300 ease-in-out  bg-gray-800 bg-opacity-50 top-0 right-0 bottom-0 left-0 flex z-0 ${className}`}
    >
      <div
        onMouseLeave={onClose}
        className=" lg:mx-20  shadow-lg rounded-b-md  w-96 flex flex-col items-center  bg-white  h-44"
      >
        <span
          onClick={() => handleClick("recien_nacido")}
          value=""
          className="h-auto tracking-widest cursor-pointer w-full font-slate-500 font-semibold border-y-2 border-x-none  text-center py-2"
        >
          RECIEN NACIDO (0-3 meses)
        </span>
        <span
          onClick={() => handleClick("bebe")}
          value="bebe"
          className="h-auto tracking-widest cursor-pointer w-full font-slate-500 font-semibold border-y-2  border-x-none text-center py-2"
        >
          BEBE (3-48 meses)
        </span>
        <span
          onClick={() => handleClick("infantil")}
          value="infantil"
          className="h-auto tracking-widest cursor-pointer w-full font-slate-500 font-semibold border-y-2  border-x-none text-center py-2"
        >
          INFANTIL (4-8 años)
        </span>
        <span
          onClick={() => handleClick("junior")}
          value="junior"
          className="h-auto tracking-widest cursor-pointer w-full font-slate-500 font-semibold border-y-2 rounded-b-md  border-x-none text-center py-2"
        >
          JUNIOR (9-14 años)
        </span>
      </div>
    </div>
  );
};

export default NavbarModal;
