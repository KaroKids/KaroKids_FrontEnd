export function numeroEnPalabras(numero) {
    const unidades = ['', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
    const decenas = ['', 'Diez', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
    const especiales = ['Diez', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];
    const centenas = ['', 'Ciento', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];

    function convertirUnidades(numero) {
        return unidades[numero];
    }

    function convertirDecenas(numero) {
        if (numero < 10) {
            return convertirUnidades(numero);
        } else if (numero >= 10 && numero < 20) {
            return especiales[numero - 10];
        } else {
            const unidad = numero % 10;
            const decena = Math.floor(numero / 10);
            return decenas[decena] + (unidad !== 0 ? ' y ' + convertirUnidades(unidad) : '');
        }
    }

    function convertirCentenas(numero) {
        if (numero < 100) {
            return convertirDecenas(numero);
        } else {
            const centena = Math.floor(numero / 100);
            const resto = numero % 100;
            return (centena === 1 && resto !== 0 ? 'Cien' : centenas[centena]) + (resto !== 0 ? ' ' + convertirDecenas(resto) : '');
        }
    }

    if (numero === 0) {
        return 'Cero';
    } else if (numero < 1000) {
        return convertirCentenas(numero);
    } else {
        const millar = Math.floor(numero / 1000);
        const resto = numero % 1000;
        return convertirCentenas(millar) + ' Mil' + (resto !== 0 ? ' ' + convertirCentenas(resto) : '');
    }
}

 