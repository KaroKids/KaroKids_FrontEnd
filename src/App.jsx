import "./App.css";

import { Footer } from "./components/Footer/Footer";
import Landing from "./components/Home/Landing";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import SocialBar from "./components/SocialBar";

function App() {
  return (
    <main className="font-montserrat">
      <Landing />
      <ProductDetail />
      <SocialBar />
      <Footer />
    </main>
  );
}

export default App;
