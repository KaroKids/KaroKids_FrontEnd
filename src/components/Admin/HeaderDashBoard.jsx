import NavBarDesktopDB from "./NavBarDeskTopDB";
import NavBarMobileDB from "./NavBarMobileDB";

const HeaderDashBoard = () => {
  return (
    <header className="mb-2">
      <NavBarMobileDB  />
      <NavBarDesktopDB />
    </header>
  );
};

export default HeaderDashBoard;