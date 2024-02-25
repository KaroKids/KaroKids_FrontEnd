import "./App.css";
import Header from "./components/Header/Header";
import Landing from "./components/Home/Landing";
import SideBarSocial from "./components/SidebarSocial/SideBarSocial";
import { Footer } from "./components/Footer/Footer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductList from "./components/ProductList/ProductList";
import { Routes, Route, useLocation } from "react-router-dom";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import Dashboard from "./components/Admin/Dashboard";
import Login from "./components/Auth/Login";
import Cart from "./components/Cart/Cart";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Auth/Register";
import PanelUsuario from "./components/User/PanelUsuario";

function App() {
  const { pathname } = useLocation();

  return (
    <AuthProvider>
      <main className="min-h-screen font-montserrat">
        {pathname !== "/create" &&
          pathname !== "/admin" &&
          pathname !== "/login" && <Header />}

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/usuario/panel-control" element={<PanelUsuario />} />
          <Route path="/usuario/datos-personales" element={<PanelUsuario />} />
          <Route path="/usuario/pedidos" element={<PanelUsuario />} />
        </Routes>
        {pathname !== "/create" && <SideBarSocial />}
        {pathname !== "/create" && pathname !== "/login" && <Footer />}
      </main>
    </AuthProvider>
  );
}

export default App;
