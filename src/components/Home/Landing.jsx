import Hero from "./Hero";
import Carrousel from "./Carrousel";
import ServicesHome from "../Services/ServicesHome";
import BoyGirl from "./BoyGirl";
import axios from "axios";
import { useEffect } from "react";
import { resetFiltering } from "@/redux/productosSlice";
import { useDispatch } from "react-redux";

const peticion = async () => {
  const { data } = await axios.post(
    "http://localhost:3001/payment/create-order"
  );
  window.location.href = data.init_point;
};

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(resetFiltering());
  }, []);

  return (
    <div className="mt-20">
      <Hero />
      {/* <button onClick={peticion}>Checkout</button> */}
      <Carrousel />
      <BoyGirl />
      <ServicesHome />
    </div>
  );
};

export default Landing;
