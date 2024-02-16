import "./App.css";

import { Footer } from "./components/Footer/Footer";
import Landing from "./components/Home/Landing";
import SocialBar from "./components/SocialBar";

function App() {
	return (
		<main className="font-montserrat">
			<Landing />
			<SocialBar />
			<Footer />
		</main>
	);
}

export default App;
