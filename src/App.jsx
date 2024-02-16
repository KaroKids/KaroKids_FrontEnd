import "./App.css";
import Header from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Landing from "./components/Home/Landing";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import SideBarSocial from "./components/SidebarSocial/SideBarSocial";
import Hero from "./components/Home/Hero";

function App() {
	return (
		<main className="font-montserrat">
			<Header />
			<Hero />
			<Landing />
			<ProductDetail />
			<SideBarSocial />
			<Footer />
		</main>
	);
}

export default App;
