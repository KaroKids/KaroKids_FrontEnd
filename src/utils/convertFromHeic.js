import heic2any from "heic2any";

export const convertFromHeic = async (img) => {
    try {
        const filename = img.name;
        const extension = filename.split('.').pop().toLowerCase();
        console.log('Extension del archivo', extension.toLowerCase());

        if (extension === 'heic') {
            const blob = new Blob([img], { type: 'image/heic' });

            let conversionResult = await heic2any({
                blob: blob,
                toType: "image/jpeg",
                quality: 1,
            });

            console.log("Este es el resultado de la conversión: ", conversionResult);
            return conversionResult;
        }
        else {
            console.log('La imagen no se encontraba en formato HEIC');
            return img;
        }
    } catch (error) {
        console.error(error);
        throw new Error ("No fue posible convertir la imagen proporcionada")
    }
};
