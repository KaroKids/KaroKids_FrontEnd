import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import OrderModal from "./OrderModal";
import { seHizoUnaReview } from "@/redux/userAction";
import coloresDiccionario from "@/utils/traductor";

const OrderDetail = () => {
  console.log(coloresDiccionario);
  const ordenDetail = useSelector((state) => state.users.ordenDetail);
  const dispatch = useDispatch();
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleModal = (usuario_id, producto_id) => {
    dispatch(seHizoUnaReview(usuario_id, producto_id));
    setSelectedProductId(producto_id);
    setRatingModalOpen(true);
  };

  useEffect(() => {}, [ordenDetail]);

  const fecha = new Date(ordenDetail.createdAt);
  const opciones = { year: "numeric", month: "long", day: "numeric" };
  const fechaFixed = fecha.toLocaleDateString("es-ES", opciones);
  return (
    <section className="min-h-screen pb-10  px-2 pt-28 flex gap-x-10 justify-center items-start">
      <div className="flex flex-col gap-y-4">
        {ordenDetail ? (
          ordenDetail &&
          ordenDetail.productos_compra &&
          ordenDetail?.productos_compra?.map((product) => {
            return (
              <article className="bg-slate-100  flex flex-col  md:flex-row items-center gap-4 px-4 py-2 rounded-md shadow-md shadow-slate-400">
                <img
                  className="w-32 rounded-lg"
                  src={product.picture_url}
                  alt={product.title}
                />
                <div className="flex  w-full flex-col gap-y-2">
                  <h3 className="font-bold">{product.title}</h3>

                  <p>
                    <strong className="mb-2">
                      Tallas, colores y cantidad:
                    </strong>
                    {Object.entries(product.producto_detalle).map(
                      ([talla, colores]) => (
                        <div className="flex flex-col gap-y-1">
                          <strong className="underline">Talla {talla}</strong>
                          {Object.entries(colores).map(([color, cantidad]) => (
                            <div className="flex gap-x-2">
                              <p>
                                <strong>Color:</strong>{" "}
                                {coloresDiccionario[color]}
                              </p>
                              <p>
                                <strong>Cantidad:</strong> {cantidad}
                              </p>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </p>
                  <p className="flex flex-col items-center">
                    <strong>Precio p/u:</strong> $ {product.unit_price}
                  </p>
                </div>
                <Button
                  variant="detail"
                  onClick={() =>
                    handleModal(ordenDetail.usuario_id, product.id)
                  }
                >
                  Calificar
                </Button>
              </article>
            );
          })
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <div className="bg-slate-100 p-4 rounded-md shadow-md shadow-slate-400">
        <h2 className="mb-3 text-center font-bold underline">
          Resumen de pago
        </h2>
        <ul className="flex flex-col gap-y-2">
          <li>
            <strong>Fecha de compra: </strong> {fechaFixed}
          </li>
          <li>
            <strong>Metodo de pago: </strong> {ordenDetail.metodo_pago}
          </li>
          <li>
            <strong>Estado del pago: </strong> {ordenDetail.estado_pago}
          </li>
          <li className="border-t-2 border-slate-900 text-center">
            <strong>Total: </strong> $ {ordenDetail.coste_total}
          </li>
        </ul>
      </div>
      <OrderModal
        isOpen={isRatingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        usuario_id={ordenDetail.usuario_id}
        producto_id={selectedProductId}
      />
    </section>
  );
};

export default OrderDetail;
