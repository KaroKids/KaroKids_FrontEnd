const NavbarDesktop = () => {
  return (
    <nav className="hidden h-14 md:block md:flex items-center pl-9">
      <ul className="w-[370px] flex gap-2 justify-center items-center flex-wrap font-medium">
        <li>Home</li>
        <li className="flex gap-1 items-center">
          Recien nacido{" "}
          <img
            src="../../../public/assets/navbar-icons/arrow-down.svg"
            alt="Logo de busqueda"
            className="pt-1"
          />
        </li>
        <li className="flex gap-1">
          Bebé{" "}
          <img
            src="../../../public/assets/navbar-icons/arrow-down.svg"
            alt="Logo de busqueda"
            className="pt-1"
          />
        </li>
        <li className="flex gap-1">
          Infantil{" "}
          <img
            src="../../../public/assets/navbar-icons/arrow-down.svg"
            alt="Logo de busqueda"
            className="pt-1"
          />
        </li>
        <li className="flex gap-1">
          Junior{" "}
          <img
            src="../../../public/assets/navbar-icons/arrow-down.svg"
            alt="Logo de busqueda"
            className="pt-1"
          />
        </li>
      </ul>
      <figure className="mx-auto">
        <img
          src="../../../public/assets/images/logo-karokids.png"
          alt="Logo de KaroKids"
          className="w-[184px] h-[45px]"
        />
      </figure>
      <ul className="w-[360px] flex gap-4 justify-center">
        <li className="text-sky-500 font-medium">
          <a href="/">Login</a> / <a href="/">Register</a>
        </li>
        <li>
          <img
            src="../../../public/assets/navbar-icons/search-blue.svg"
            alt="Logo de Busqueda"
            className="w-6 h-6"
          />
        </li>
        <li>
          <img
            src="../../../public/assets/navbar-icons/cart-blue.svg"
            alt="Logo del carrito de compras"
            className="w-6 h-6"
          />
        </li>
        <li>
          <img
            src="../../../public/assets/navbar-icons/fav-blue.svg"
            alt="Logo de Favoritos"
            className="w-6 h-6"
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavbarDesktop;
