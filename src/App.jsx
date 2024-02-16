import "./App.css";
import Header from "./components/Header/Header";
import Landing from "./components/Home/Landing";
import SideBarSocial from "./components/SidebarSocial/SideBarSocial";
import { Footer } from "./components/Footer/Footer";

function App() {
	return (
		<main className="font-montserrat">
			<Header />
			<Landing />
			<SideBarSocial />
			<Footer />
		</main>
	);
}

export default App;
