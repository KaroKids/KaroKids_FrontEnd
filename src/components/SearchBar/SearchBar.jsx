import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import {
  getProductsByFilters,
  setFilteringActive,
} from "@/redux/productosActions";

import { useLocation, useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryGlobal } from "@/redux/productosSlice";

const SearchBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  const handleInput = (e) => {
    const updatedQuery = e;
    setQuery(updatedQuery);
    dispatch(queryGlobal(query));
    const queryParam = { nombre: updatedQuery };
    const nuevaUbicacion = {
      ...location,
      search: "",
    };

    queryParam.nombre === ""
      ? navigate(nuevaUbicacion)
      : navigate(`/productos?${new URLSearchParams(queryParam).toString()}`);

    if (query.length > 0) {
      dispatch(setFilteringActive(true));
    } else {
      dispatch(setFilteringActive(false));
    }
    dispatch(getProductsByFilters({ nombre: updatedQuery }));
  };

  const handleSearch = () => {
    const queryParam = { nombre: query };

    const nuevaUbicacion = {
      ...location,
      search: "",
    };

    queryParam.nombre === ""
      ? navigate(nuevaUbicacion)
      : navigate(`/productos?${new URLSearchParams(queryParam).toString()}`);

    if (query.length > 0) {
      dispatch(setFilteringActive(true));
    } else {
      dispatch(setFilteringActive(false));
    }
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
    <div className="flex items-center gap-2 mx-2 lg:mx-0">
      <Input
        type="text"
        placeholder="Busca aquí..."
        className=" w-full lg:w-22 xl:w-32"
        value={query}
        onChange={(e) => handleInput(e.target.value)}
      />
      {pathname !== "/productos" ? (
        <Link to="/productos">
          {anchoPantalla >= 1024 ? (
            <Button
              variant="searchBar"
              type="submit"
              className="px-2"
              onClick={handleSearch}
            >
              <img
                src="/assets/navbar-icons/search-blue.svg"
                alt="Logo de Busqueda"
                className="w-6 h-6"
              />
            </Button>
          ) : (
            <Button
              variant="searchBar"
              type="submit"
              className="px-2"
              onClick={handleSearch}
            >
              <img
                src="/assets/navbar-icons/search.svg"
                alt="Logo de Busqueda"
                className="w-6 h-6"
              />
            </Button>
          )}
        </Link>
      ) : (
        <>
          {anchoPantalla >= 1024 ? (
            <Button
              variant="searchBar"
              type="submit"
              className="px-2"
              onClick={handleSearch}
            >
              <img
                src="/assets/navbar-icons/search-blue.svg"
                alt="Logo de Busqueda"
                className="w-6 h-6"
              />
            </Button>
          ) : (
            <Button
              variant="searchBar"
              type="submit"
              className="px-2"
              onClick={handleSearch}
            >
              <img
                src="/assets/navbar-icons/search.svg"
                alt="Logo de Busqueda"
                className="w-6 h-6"
              />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBar;
