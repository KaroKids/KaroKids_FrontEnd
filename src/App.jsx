import "./App.css";
import { Button } from "./components/ui/button";
import { Footer } from "./components/Footer/Footer";
import SocialBar from "./components/SocialBar";

function App() {
	return (
		<main className="font-montserrat">
			<Button>KaroKids Button</Button>
			<SocialBar />
			<Footer />
		</main>
	);
}

export default App;
