export default function generarPedidoJson(productos_compra) {
    const pedidoJson = {
        Orden_de_compra : ""
    };
    let total = 0;
    productos_compra.forEach((producto, index) => {
      const productoIndex = index + 1;
      pedidoJson[`,producto_${productoIndex},`] = {

        nombre: producto.producto_nombre,
        talla: producto.compra_talla,
        color: producto.compra_color,
        cantidad: producto.compra_cantidad,
        precio: producto.producto_precio,
      };
      total = total + producto.producto_precio
    });
    pedidoJson[`,Total`] = total
    return pedidoJson;
}