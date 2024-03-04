import boysImg from "/assets/images/chicos_k.png";
import girlsImg from "/assets/images/chicas_k.png";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  getProductsByFilters,
  setFilteringActive,
} from "@/redux/productosActions";
import { Link } from "react-router-dom";
const BoyGirl = () => {
  const dispatch = useDispatch();
  const callouts = [
    {
      name: "Niños",
      description: "Ropas para niños",
      imageSrc: boysImg,
      imageAlt:
        "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      href: "#",
      buttonClass:
        "bg-transparent w-60 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",
    },
    {
      name: "Niñas",
      description: "Ropas para niñas",
      imageSrc: girlsImg,
      imageAlt:
        "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
      href: "#",
      buttonClass:
        "bg-transparent  w-60 hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded",
    },
  ];

  const handleClick = (e) => {
    let value = e.target.name;
    dispatch(setFilteringActive(true));
    dispatch(getProductsByFilters({ genero: value }));
  };

  return (
    <div className="mx-auto mb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-3">
          <h2 className="text-2xl font-bold text-gray-900">Secciones</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group">
                <div className="flex justify-center border-2 mt-6 mb-10 h-80 w-full  rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-auto  object-center "
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <span className="inset-0" />
                  {callout.name}
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
                {callout.name === "Niños" ? (
                  <Link to="/productos">
                    <Button
                      className={callout.buttonClass}
                      onClick={handleClick}
                      value="chico"
                      name="chico"
                    >
                      Ingresar
                    </Button>
                  </Link>
                ) : (
                  <Link to="/productos">
                    <Button
                      className={callout.buttonClass}
                      onClick={handleClick}
                      value="chica"
                      name="chica"
                    >
                      Ingresar
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoyGirl;
