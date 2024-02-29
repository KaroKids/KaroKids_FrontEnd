import NavBarDesktopDB from "./NavBarDeskTopDB";
import NavBarMobileDB from "./NavBarMobileDB";

const HeaderDashBoard = ({updateMenuSelected}) => {
  return (
    <header className="mb-2">
      <NavBarMobileDB />
      <NavBarDesktopDB updateMenuSelected={updateMenuSelected}  />
    </header>
  );
};

export default HeaderDashBoard;