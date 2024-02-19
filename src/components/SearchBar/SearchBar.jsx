import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

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
      />
      <Button variant="searchBar" type="submit" className="px-2">
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
    </div>
  );
};

export default SearchBar;
