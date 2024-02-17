import Hero from "./Hero";
import Carrousel from "./Carrousel";
import ServicesHome from "../Services/ServicesHome";
import BoyGirl from "./BoyGirl";

const Landing = () => {
	return (
		<div>
			<Hero />
			<Carrousel />
			<BoyGirl />
			<ServicesHome />
		</div>
	);
};

export default Landing;
