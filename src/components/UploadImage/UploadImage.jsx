UploadImage.jsx
import { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { convertFromHeic } from "@/utils/heicToJpeg";


const UploadImage = ({
	onGetImagenPrincipal,
	onGetImagSecundarias,
	errors
}) => {
	const [imagenPrincipal, setImagenPrincipal] = useState([]);
	const [imagSecundarias, setImagSecundarias] = useState([]);
	const [loadingImage, setloadingImage] = useState(false);

	const extensionRegex = /\.(heic|heif)$/i;

	//Permite establecer los parámetros de las funciones que se envían por props al componente padre CreateProduct.
	useEffect(() => {
		if (imagenPrincipal[0] !== undefined) {
			onGetImagenPrincipal(imagenPrincipal[0]);
		}
	}, [imagenPrincipal]);

	useEffect(() => {
		if (imagSecundarias[0] !== undefined) {
			//Se almacena en una variable el último valor hasheado introducido en el arreglo.
			let i = imagSecundarias.length - 1;
			onGetImagSecundarias(imagSecundarias[i]);
		}
	}, [imagSecundarias]);
	
	// Función para convertir los archivos previsulizados a Base64 y actualizar los estados ImagSecundarias y/o ImagenPrincipal.
	function previewFiles(file, type) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			if (type === "imgPrincipal") {
				setImagenPrincipal([reader.result]);
			}

			if (type === "imgSecundarias") {
				setImagSecundarias([...imagSecundarias, reader.result]);
			}
		};
	}

	//Funciones almacenan los valores de previsualización de los archivos cargados por el usuario.
	const previewImagenPrincipal = (e) => {
		const type = "imgPrincipal";

		const selectedImage = e.target.files[0];

		//todo Condicional para la conversión de las imágenes en formato HEIC a formato JPEG.
		if (extensionRegex.test(selectedImage)) {
			const conversionResult = convertFromHeic(selectedImage)

			previewFiles(conversionResult, type);
		}

		previewFiles(selectedImage, type);
	};

	const previewImagSecundarias = (e) => {
		const type = "imgSecundarias";

		const selectedImage = e.target.files[0];

		//todo Condicional para la conversión de las imágenes en formato HEIC a formato JPEG.
		if (extensionRegex.test(selectedImage)) {
			const conversionResult = convertFromHeic(selectedImage)
			
			previewFiles(conversionResult, type);
		}

		previewFiles(selectedImage, type);
	};
	
	return (
		<div>
			<div className="col-span-full r">
				<label
					htmlFor="imagenPrincipal"
					className="block text-sm font-semibold mt-5 leading-6 text-gray-900">
					Imagen Principal
				</label>
				<div
					className={`mt-2 flex justify-center rounded-lg border ${errors?.imagen_principal ? "border-red-400" : "border-dashed"} border-dashed border-gray-900/25 px-6 py-10`}>
					<div className="text-center">
						<div className="flex flex-row justify-start items-center border-none mx-1 ">
							{errors.imagen_principal && (
								<p className="mt-1  text-left text-small text-red-500 ">
									{errors?.imagen_principal}
								</p>
							)}
						</div>
						{imagenPrincipal && (
							<div className="mt-2 flex flex-wrap justify-center lg:flex-col">
								{imagenPrincipal?.map((imageUrl, index) => (
									<img
										key={index}
										className="h-96 w-full rounded-lg object-cover object-center"
										src={imageUrl}
										alt={`Imagen ${index + 1}`}
									/>
								))}
							</div>
						)}
						{!imagenPrincipal.length && (
							<PhotoIcon
								className="mx-auto h-12 w-12 text-gray-300"
								aria-hidden="true"
							/>
						)}
						<div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
							<label
								htmlFor="imagenPrincipal"
								className=" relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
								<span className="flex justify-center text-center">
									Subir la foto
								</span>
								<input
									id="imagenPrincipal"
									onChange={previewImagenPrincipal}
									name="imagenPrincipal"
									type="file"
									className="sr-only"
								/>
							</label>
							<p className="pl-1">click para subir la foto</p>
						</div>
						<p className="flex flex-col text-xs leading-5 text-gray-600">
							PNG, JPG, GIF hasta 1 MB
						</p>
					</div>
				</div>
			</div>

			<div className="col-span-full">
				<label
					htmlFor="imagSecundarias"
					className="block text-sm font-semibold mt-5 leading-6 text-gray-900">
					Imagenes Secundarias {errors.imagSecundarias}
				</label>
				<div
					className={`mt-2 flex justify-center rounded-lg border ${errors && errors.imagenes_secundarias && errors.imagenes_secundarias.length > 0 ? "border-red-400" : "border-dashed"} border-dashed border-gray-900/25 px-6 py-10`}>
					<div className="text-center">
						<div className="flex flex-row justify-start items-center border-none mx-1 ">
							{errors.imagenes_secundarias && (
								<p className="mt-1  text-left text-small text-red-500 ">
									{errors?.imagenes_secundarias}
								</p>
							)}
						</div>
						{imagSecundarias && (
							<div className="mt-2 flex flex-wrap justify-center lg:flex-col gap-2">
								{imagSecundarias?.map((imageUrl, index) => (
									<img
										key={index}
										className="lg:h-25 lg:w-40  rounded-lg object-cover object-center"
										src={imageUrl}
										alt={`Imagen ${index + 1}`}
									/>
								))}
							</div>
						)}
						{!imagSecundarias.length && (
							<PhotoIcon
								className="mx-auto h-12 w-12 text-gray-300"
								aria-hidden="true"
							/>
						)}
						<div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
							<label
								htmlFor="imagSecundarias"
								className=" relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
								<span className="flex justify-center text-center">
									Subir la foto
								</span>
								<input
									id="imagSecundarias"
									onChange={previewImagSecundarias}
									name="file-upload-second"
									type="file"
									className="sr-only"
								/>
							</label>
							<p className="pl-1">click para subir foto</p>
						</div>
						<p className="flex flex-col text-xs leading-5 text-gray-600">
							PNG, JPG, GIF hasta 1 MB
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadImage;
