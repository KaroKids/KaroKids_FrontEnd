import FooterHead from "./Footer-Head";
import FooterBody from "./Footer-Body";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-5">
      <div className="container mx-auto  text-xs">
        <FooterHead />
        <FooterBody />
      </div>
    </footer>
  );
};
