import FooterMap from "./Footer-Map";

const FooterBody = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 lg:auto-cols-auto gap-8 pt-5">
      <section className="mb-8 md:mb-0">
        <h5 className="mb-4 text-lg font-bold">Enlaces</h5>
        <nav>
          <ul className="flex flex-col">
            <li className="mr-4 mb-2">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Inicio
              </a>
            </li>
            <li className="mr-4 mb-2">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Productos
              </a>
            </li>
            <li className="mr-4 mb-2">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Promociones
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <section className="mb-8 md:mb-0">
        <h5 className="mb-4 text-lg font-bold">Legal</h5>
        <nav>
          <ul className="flex flex-col">
            <li className="mr-4 mb-2">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Sobre Nosotros
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <section className="mb-8 md:mb-0 ">
        <h5 className="mb-4 text-lg font-bold">Contacto</h5>
        <nav>
          <ul className="flex flex-col">
            <li className="mr-4 mb-2">
              <a
                href="mailto:clienteskarokids@gmail.com"
                className="text-gray-700 hover:text-gray-9lg"
              >
                clienteskarokids@gmail.com
              </a>
            </li>
            <li className="mr-4 mb-2">
              Centro comercial Unión Plaza local 219 (www.unionplaza.com.co)
              Medellín -Colombiagi
            </li>
          </ul>
        </nav>
      </section>
      <FooterMap />
    </section>
  );
};

export default FooterBody;
