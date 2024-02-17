import Hero from "./Hero";
import Carrousel from "./Carrousel";
import ServicesHome from "../Services/ServicesHome";

const Landing = () => {
  return (
    <div className="mt-10 xl:mt-20">
      <Hero />
      <Carrousel />
      {/* BoyGirl */}
      <ServicesHome />
    </div>
  );
};

export default Landing;
