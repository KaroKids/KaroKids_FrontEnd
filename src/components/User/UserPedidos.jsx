import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserPedidos = (data) => {
  const ordersDB = useSelector((state) => state.users.ordenes);

  useEffect(() => {
    console.log(ordersDB);
  }, [data]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      {data && ordersDB.length > 0 ? (
        ordersDB?.map((order, i) => {
          return (
            <article
              key={i}
              className="h-40 w-fit border-2 border-gray-400 rounded-sm flex items-center gap-x-4"
            >
              <figure className="w-1/4 h-full flex justify-center py-2">
                <img src={order.productos_compra[0].picture_url} alt="" />
              </figure>
              <div className="flex">
                <p>
                  <strong>Metodo de pago:</strong> {order.metodo_pago}
                </p>
                <p>
                  <strong>Estado del Pago:</strong> {order.estado_pago}
                </p>
                <p>
                  <strong>Monton total:</strong> ${order.coste_total}
                </p>
              </div>
              <p>
                <strong>Estado del pedido:</strong> {order.estado_pedido}
              </p>
            </article>
          );
        })
      ) : (
        <>
          <div className="flex flex-col gap-y-4 my-4 h-32 w-auto">
            <h1>Actualmente no tiene pedidos</h1>
            <Link to="/productos">
              <span>⬅ Ir a comprar</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPedidos;
