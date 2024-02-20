import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { getProductsByFilters } from "@/redux/productosActions";

import { useLocation, useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  const handleSearch = () => {
    const queryParam = { nombre: query };

    const nuevaUbicacion = {
      ...location,
      search: "",
    };

    queryParam.nombre === ""
      ? navigate(nuevaUbicacion)
      : navigate(`/productos?${new URLSearchParams(queryParam).toString()}`);

    dispatch(getProductsByFilters({ nombre: query }));
    setQuery("");
  };

  useEffect(() => {
    const manejarCambiosDeAncho = () => {
      setAnchoPantalla(window.innerWidth);
    };

    window.addEventListener("resize", manejarCambiosDeAncho);

    return () => {
      window.removeEventListener("resize", manejarCambiosDeAncho);
    };
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Buzo..."
        className="md:w-14 lg:w-20 xl:w-32"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {pathname !== "/productos" ? (
        <Link to="/productos">
          <Button
            variant="searchBar"
            type="submit"
            className="px-2"
            onClick={handleSearch}
          >
            {" "}
            {anchoPantalla >= 768 ? (
              <img
                src="/assets/navbar-icons/search-blue.svg"
                alt="Logo de Busqueda"
                className="w-6 h-6"
              />
            ) : (
              <img
                src="/assets/navbar-icons/search.svg"
                alt="Logo de Busqueda"
                className="w-6 h-6"
              />
            )}
          </Button>
        </Link>
      ) : (
        <Button
          variant="searchBar"
          type="submit"
          className="px-2"
          onClick={handleSearch}
        >
          {" "}
          {anchoPantalla >= 768 ? (
            <img
              src="/assets/navbar-icons/search-blue.svg"
              alt="Logo de Busqueda"
              className="w-6 h-6"
            />
          ) : (
            <img
              src="/assets/navbar-icons/search.svg"
              alt="Logo de Busqueda"
              className="w-6 h-6"
            />
          )}
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
