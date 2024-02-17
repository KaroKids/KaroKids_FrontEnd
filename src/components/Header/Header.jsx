import NavbarDesktop from "../Navbar/NavbarDesktop";
import NavbarMobile from "../Navbar/NavbarMobile";

const Header = () => {
  return (
    <header className="mb-2">
      <NavbarMobile />
      <NavbarDesktop />
    </header>
  );
};

export default Header;
