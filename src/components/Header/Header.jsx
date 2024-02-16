import Banner from "../Banner/Banner";
import NavbarDesktop from "../Navbar/NavbarDesktop";
import NavbarMobile from "../Navbar/NavbarMobile";

const Header = () => {
  return (
    <header>
      <Banner />
      <NavbarMobile />
      <NavbarDesktop />
    </header>
  );
};

export default Header;
