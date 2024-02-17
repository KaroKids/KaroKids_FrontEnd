import "./App.css";
import Header from "./components/Header/Header";
import Landing from "./components/Home/Landing";
import SideBarSocial from "./components/SidebarSocial/SideBarSocial";
import { Footer } from "./components/Footer/Footer";
import ProductDetail from "./components/ProductDetail/ProductDetail";

function App() {
  return (
    <main className="min-h-screen font-montserrat">
      <Header />
      <Landing />
      <ProductDetail />
      <SideBarSocial />
      <Footer />
    </main>
  );
}

export default App;
