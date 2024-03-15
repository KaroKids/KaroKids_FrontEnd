import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { getOrderById } from "@/redux/userAction";

const UserPedidos = (data) => {
  const dispatch = useDispatch();
  const ordersDB = useSelector((state) => state.users.ordenes);

  const handleDetailOrder = (order_id) => {
    dispatch(getOrderById(order_id));
  };

  useEffect(() => {}, [data]);

  const applyOrdenCompraStyle = (pdf, text, y) => {
    // Configura estilos para "Orden de Compra"
    pdf.setFontSize(16);
    const textWidth =
      (pdf.getStringUnitWidth(text) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const marginLeft = (pdf.internal.pageSize.width - textWidth) / 2;
    pdf.text(marginLeft, y, text);

    // Restaura el tamaño de fuente para otros elementos
    pdf.setFontSize(12);
  };
  const handleDownloadPDF = (order) => {
    // Crea una nueva instancia de jsPDF
    const pdf = new jsPDF();

    // Agrega el logo de la empresa en la parte superior
    const logoPath = "/assets/images/logo-karokids.png"; // Reemplaza con la ruta correcta

    // Obtiene el ancho del logo y calcula la posición central
    const logoWidth = 40; // Ajusta según el ancho de tu logo
    const logoHeight = 20; // Ajusta según la altura deseada
    const logoMarginLeft = (pdf.internal.pageSize.width - logoWidth) / 2;

    pdf.addImage(logoPath, "JPEG", logoMarginLeft, 10, logoWidth, logoHeight);

    // Aplica el estilo "Orden de Compra" para el título principal
    applyOrdenCompraStyle(pdf, "Orden de Compra", 60); // Ajusta la posición según sea necesario

    // Agrega contenido al PDF
    applyOrdenCompraStyle(pdf, `Número de orden: ${order.orden_id}`, 80);
    applyOrdenCompraStyle(pdf, `Fecha de creación: ${order.createdAt}`, 90);
    applyOrdenCompraStyle(pdf, `Coste total: $ ${order.coste_total}`, 100);
    applyOrdenCompraStyle(pdf, `Estado de pago: ${order.estado_pago}`, 110);
    applyOrdenCompraStyle(pdf, `Estado de pedido: ${order.estado_pedido}`, 120);
    applyOrdenCompraStyle(pdf, `Método de pago: ${order.metodo_pago}`, 130);

    // Itera sobre los productos de compra y agrega detalles al PDF
    order.productos_compra.forEach((producto, index) => {
      const startY = 150 + index * 30; // Ajusta la posición según sea necesario
      applyOrdenCompraStyle(
        pdf,
        `Producto ${index + 1}: ${producto.title}`,
        startY
      );
      applyOrdenCompraStyle(pdf, `Cantidad: ${producto.quantity}`, startY + 10);
      applyOrdenCompraStyle(
        pdf,
        `Precio unitario: $ ${producto.unit_price}`,
        startY + 20
      );
      // Agrega más detalles según tu estructura de datos
    });

    // Guarda el PDF con un nombre específico
    pdf.save(`orden_${order.orden_id}.pdf`);
  };

  const handleDownloadClick = (order) => {
    handleDownloadPDF(order);
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      {data && ordersDB.length > 0 ? (
        ordersDB?.map((order, i) => {
          const fixedMetodoPago =
            order.metodo_pago.charAt(0).toUpperCase() +
            order.metodo_pago.slice(1);

          const fixedEstadoPago =
            order.estado_pago.charAt(0).toUpperCase() +
            order.estado_pago.slice(1);
          const fixedEstadoPedido =
            order.estado_pedido.charAt(0).toUpperCase() +
            order.estado_pedido.slice(1);
          return (
            <article
              key={i}
              className="xl:h-40 xl:w-fit px-2 border-2 py-2 border-gray-400 rounded-sm flex flex-col w-full lg:flex-row items-center gap-x-4"
            >
              <figure className="w-1/4 h-full flex justify-center py-2">
                <img
                  className="rounded-lg boder border-slate-500"
                  src={order.productos_compra[0].picture_url}
                  alt={order.productos_compra[0].title}
                />
              </figure>
              <div className="flex flex-col lg:flex-row">
                <p>
                  <strong>Metodo de pago:</strong> {fixedMetodoPago}
                </p>
                <p>
                  <strong>Estado del Pago:</strong> {fixedEstadoPago}
                </p>
                <p>
                  <strong>Monton total:</strong> ${order.coste_total}
                </p>
              </div>
              <p className="mb-2">
                <strong>Estado del pedido:</strong> {fixedEstadoPedido}
              </p>
              <div className="flex lg:flex-col gap-y-2">
                <Button
                  onClick={() => handleDetailOrder(order.orden_id)}
                  className="md:w-full ml-2 md:ml-0 w-auto"
                  variant="detail"
                  disabled={
                    fixedEstadoPago === "Pendiente" ||
                    fixedEstadoPago === "Cancelado"
                  }
                >
                  <Link to={`/usuario/pedidos/${order.orden_id}`}>
                    Ver detalle
                  </Link>
                </Button>
                <Button
                  className="bg-red-500 mx-2 lg:mx-0 w-32 md:w-full"
                  onClick={() => handleDownloadClick(order)}
                >
                  Descargar PDF
                </Button>
              </div>
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
