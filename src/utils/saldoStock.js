// Función para calcular la sumatoria de la cantidad en el stock
export default function saldoStock(stock) {
    let sumatoria = 0;
    for (let talla in stock) {
        for (let i = 0; i < stock[talla].length; i++) {
            sumatoria += Number(stock[talla][i].cantidad);
        }
    }
    return sumatoria;
}