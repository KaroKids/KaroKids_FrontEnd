import NavBarDesktopDB from "./NavBarDeskTopDB";
import NavBarMobileDB from "./NavBarMobileDB";

const HeaderDashBoard = ({updateMenuSelected}) => {
  return (
    <header className="mb-2">
      <NavBarMobileDB updateMenuSelected={updateMenuSelected} />
      <NavBarDesktopDB updateMenuSelected={updateMenuSelected}  />
    </header>
  );
};

export default HeaderDashBoard;