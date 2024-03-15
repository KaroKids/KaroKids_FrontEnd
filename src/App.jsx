import "./App.css";
import Header from "./components/Header/Header";
import Landing from "./components/Home/Landing";
import SideBarSocial from "./components/SidebarSocial/SideBarSocial";
import { Footer } from "./components/Footer/Footer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductList from "./components/ProductList/ProductList";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import Dashboard from "./components/Admin/Dashboard";
import Login from "./components/Auth/Login";
import Cart from "./components/Cart/Cart";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Auth/Register";
import PanelUsuario from "./components/User/PanelUsuario";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { ProtectedAdmin } from "./components/ProtectedRoute/ProtectedAdmin";
import UsersView from "./components/Admin/UsersView";
import FavoriteProducts from "./components/Favorites/FavoriteProducts";
import SobreNosotros from "./components/Legal/SobreNosotros";
import Legales from "./components/Legal/Legales";
import Stats from "./components/Admin/Stats";
import ProductsView from "./components/Admin/ProductsView";
import Orders from "./components/Admin/Orders";
import EditProduct from "./components/CreateProduct/EditProduct";
import NotFound from "./components/Home/NotFound";
import OrderDetail from "./components/OrderDetail/OrderDetail";
import OrderDetailAdmin from "./components/OrderDetail/OrderDetailAdmin";

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
					<Route path="/producto/detalle/:id" element={<ProductDetail />} />
					<Route path="/productos" element={<ProductList />} />
					<Route path="/favoritos" element={<FavoriteProducts />} />

					<Route
						path="/admin/*"
						element={
							<ProtectedAdmin>
								<Dashboard />
							</ProtectedAdmin>
						}>
						{/* Rutas anidadas dentro del Dashboard */}
						<Route index element={<Stats />} />
						<Route path="users" element={<UsersView />} />
						<Route path="products" element={<ProductsView />} />
						<Route path="orders" element={<Orders />} />
						<Route path="create" element={<CreateProduct />} />
						<Route path="editproduct/:producto_id" element={<EditProduct />} />
						<Route path="orders/:orden_id" element={<OrderDetailAdmin />} />
					</Route>

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/users"
						element={
							<ProtectedAdmin>
								<UsersView />
							</ProtectedAdmin>
						}
					/>
					<Route path="/carrito" element={<Cart />} />
					<Route
						path="/usuario/panel-control"
						element={
							<ProtectedRoute>
								{" "}
								<PanelUsuario />{" "}
							</ProtectedRoute>
						}
					/>
					<Route
						path="/usuario/datos-personales"
						element={
							<ProtectedRoute>
								<PanelUsuario />{" "}
							</ProtectedRoute>
						}
					/>

					<Route
						path="/usuario/pedidos"
						element={
							<ProtectedRoute>
								<PanelUsuario />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/usuario/pedidos/:orden_id"
						element={
							<ProtectedRoute>
								<OrderDetail />
							</ProtectedRoute>
						}
					/>

					<Route path="/nosotros" element={<SobreNosotros />} />
					<Route path="/legales" element={<Legales />} />
					<Route path="*" element={<NotFound />} />
				</Routes>

				{pathname !== "/create" && <SideBarSocial />}
				{pathname !== "/create" &&
					pathname !== "/login" &&
					pathname !== "/admin" && <Footer />}
			</main>
		</AuthProvider>
	);
}

export default App;
