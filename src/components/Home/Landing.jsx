import Hero from "./Hero";
import Carrousel from "./Carrousel";
import ServicesHome from "../Services/ServicesHome";
import BoyGirl from "./BoyGirl";
import axios from "axios";

const peticion = async () => {
  const { data } = await axios.post(
    "http://localhost:3001/payment/create-order"
  );

  console.log(data);

  window.location.href = data.init_point;
};

const Landing = () => {
  return (
    <div className="mt-20">
      <Hero />
      <button onClick={peticion}>Checkout</button>
      <Carrousel />
      <BoyGirl />
      <ServicesHome />
    </div>
  );
};

export default Landing;
