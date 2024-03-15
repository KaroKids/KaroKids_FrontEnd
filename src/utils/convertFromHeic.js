import heic2any from "heic2any";

export const convertFromHeic = async (img) => {
	try {
		const filename = img.name;
		const extension = filename.split(".").pop().toLowerCase();

		if (extension === "heic") {
			const blob = new Blob([img], { type: "image/heic" });

			let conversionResult = await heic2any({
				blob: blob,
				toType: "image/jpeg",
				quality: 1,
			});

			return conversionResult;
		} else {
			return img;
		}
	} catch (error) {
		console.error(error);
		throw new Error("No fue posible convertir la imagen proporcionada");
	}
};
