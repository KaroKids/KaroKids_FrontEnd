import heic2any from "heic2any";

export const convertFromHeic = async (img) => {
    try {
        const imgToBlob = await img.blob()
        let conversionResult = await heic2any({
            blob: imgToBlob,
            toType: "image/jpeg",
			quality: 0.5,
        })

        return conversionResult
    } catch (error) {
        console.error(error)
        throw new Error ('Error al convertir imagen HEIC')
    }
}