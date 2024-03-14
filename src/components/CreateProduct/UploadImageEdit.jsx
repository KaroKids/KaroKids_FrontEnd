import { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { convertFromHeic } from "@/utils/convertFromHeic";
import spinner from "/assets/images/spinner.svg";

const UploadImage = ({
	onGetImagenPrincipal,
	onGetImagSecundarias,
	errors,
	data,
	setData,
}) => {
	const [imagenPrincipal, setImagenPrincipal] = useState([]);
	const [imagSecundarias, setImagSecundarias] = useState([]);
	const [loadingPcplImage, setloadingPcplImage] = useState(false);
	const [loadingSndImage, setloadingSndImage] = useState(false);

	//Carga la imagen primaria
	useEffect(() => {
		if (data.imagen_principal) {
			setImagenPrincipal([data.imagen_principal]);
		}
	}, [data.imagen_principal]);

	//Carga las imagenes secundarias
	useEffect(() => {
		if (data.imagenes_secundarias && data.imagenes_secundarias.length > 0) {
			setImagSecundarias(data.imagenes_secundarias);
		}
	}, [data.imagenes_secundarias]);

	//Permite establecer los parámetros de las funciones que se envían por props al componente padre CreateProduct.
	useEffect(() => {
		if (imagenPrincipal[0] !== undefined) {
			onGetImagenPrincipal(imagenPrincipal[0]);
		}
		//setImagenPrincipal([data.imagen_principal])
		setloadingPcplImage(false);
	}, [imagenPrincipal]);

	useEffect(() => {
		if (imagSecundarias[0] !== undefined) {
			//Se almacena en una variable el último valor hasheado introducido en el arreglo.
			let i = imagSecundarias.length - 1;
			onGetImagSecundarias(imagSecundarias[i]);
		}
		setloadingSndImage(false);
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

	//Funciones que almacenan los valores de previsualización de los archivos cargados por el usuario.
	const previewImagenPrincipal = async (e) => {
		setloadingPcplImage(true);
		const type = "imgPrincipal";
		const selectedImage = e.target.files[0];

		// Conversión de las imágenes en formato HEIC a formato JPEG.
		let conversionResult = await convertFromHeic(selectedImage);

		previewFiles(conversionResult, type);
	};

	const previewImagSecundarias = async (e) => {
		setloadingSndImage(true);
		const type = "imgSecundarias";
		const selectedImage = e.target.files[0];

		// Conversión de las imágenes en formato HEIC a formato JPEG.
		let conversionResult = await convertFromHeic(selectedImage);

		previewFiles(conversionResult, type);
	};

	const eliminarImagenSecundaria = (index) => {
		const nuevasImagSecundarias = imagSecundarias.filter((_, i) => i !== index);
		setImagSecundarias(nuevasImagSecundarias);
		// Actualizar el estado data.imagenes_secundarias en el componente padre
		setData({ ...data, imagenes_secundarias: nuevasImagSecundarias });
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
								{!loadingPcplImage ? (
									<span className="flex justify-center text-center">
										Cambiar foto
									</span>
								) : (
									<img
										src={spinner}
										alt="Loading..."
										className=" bg-transparent rounded-lg mx-auto inset-1 flex items-center justify-center   w-8 h-8"
									/>
								)}
								<input
									id="imagenPrincipal"
									onChange={previewImagenPrincipal}
									name="imagenPrincipal"
									type="file"
									className="sr-only"
								/>
							</label>
							<p className="pl-2">Click para subir la foto</p>
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
								{/* Código para imagenes secundarias */}
								{imagSecundarias.map((imageUrl, index) => (
									<div key={index} className="relative">
										<img
											className="lg:h-25 lg:w-40  rounded-lg object-cover object-center "
											src={imageUrl}
											alt={`Imagen ${index + 1}`}
										/>
										<button
											type="button"
											className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1"
											onClick={() => eliminarImagenSecundaria(index)}>
											X
										</button>
									</div>
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
								{!loadingSndImage ? (
									<span className="flex justify-center text-center">
										Añadir fotos
									</span>
								) : (
									<img
										src={spinner}
										alt="Loading..."
										className=" bg-transparent rounded-lg mx-auto inset-1 flex items-center justify-center   w-8 h-8"
									/>
								)}
								<input
									id="imagSecundarias"
									onChange={previewImagSecundarias}
									name="file-upload-second"
									type="file"
									className="sr-only"
								/>
							</label>
							<p className="pl-2">Click para subir foto</p>
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
