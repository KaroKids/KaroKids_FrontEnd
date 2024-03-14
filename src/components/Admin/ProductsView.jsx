import { useEffect, useState } from "react";
import { numberMaskUnit } from "@/utils/numberMask";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import destacado from "/assets/images/destacado.svg";
import noDestacado from "/assets/images/noDestacado.svg";
import saldoStock from "@/utils/saldoStock";
 

import {
	getAllProducts,
	getProductsByFilters,
	modifyVolverFunc,
	productStatusChange,
	productStandOutChange,
	getProductsByName,
} from "@/redux/productosActions";

import filterIcon from "/assets/images/filterIcon.svg";
import Swal from "sweetalert2";

import PaginationControls from "../ProductList/PaginationControls";
import FilterOptions from "../ProductList/FilterOptions";
import { Link } from "react-router-dom";
import LoadingView from "../ui/Loading";
const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.onmouseenter = Swal.stopTimer;
		toast.onmouseleave = Swal.resumeTimer;
	},
	customClass: {
		popup: "my-toast",
	},
});

const relevancias = [
	{
		id: 0,
		name: "Ordenar por",
	},
	{
		id: 1,
		name: "Precio +",
	},
	{
		id: 2,
		name: "Precio -",
	},
	{
		id: 3,
		name: "Nombre +",
	},
	{
		id: 4,
		name: "Nombre -",
	},
];

export default function ProductList() {
  
  const [ordernarPor, setOrdernarPor] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filtrosAplicados, setFiltrosAplicados] = useState([]);
  const [query, setQuery] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [toastShown, setToastShown] = useState(false);  

	const dispatch = useDispatch();
	const productos = useSelector((state) => state.productos);

	const handleApplyFilters = (filtrosSeleccionados) => {
		setFiltrosAplicados(filtrosSeleccionados);
	};

	const handleOrdenar = (event) => {
		const nuevoOrden = parseInt(event.target.value);
		setOrdernarPor(nuevoOrden);
		setFiltrosAplicados((prevFiltrosAplicados) => ({
			...prevFiltrosAplicados,
			orden: nuevoOrden,
		}));
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		let admin = true;
		productos.volver === 0
			? dispatch(getAllProducts(admin))
			: dispatch(modifyVolverFunc(0));
		window.scroll(0, 0);
	}, []);

	useEffect(() => {
		let admin = true;
		if (ordernarPor !== 0) {
			dispatch(getProductsByFilters(filtrosAplicados, admin));
		}
	}, [ordernarPor]);

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			const name = event.target.value;
			setQuery(name);
		}
	};

	const handleLogicDelete = (producto_id, inactivo) => {
		// Mostrar confirmación antes de activar/desactivar usuario

		Swal.fire({
			title: inactivo ? "Activar Producto" : "Desactivar Producto",
			text: inactivo
				? "¿Estás seguro que deseas activar el producto?"
				: "¿Estás seguro que deseas desactivar el producto?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: inactivo ? "#3085d6" : "#d33",
			cancelButtonColor: "#6c757d",
			confirmButtonText: inactivo ? "Activar" : "Desactivar",
			cancelButtonText: "Cancelar",
			customClass: {
				popup: "my-toast",
			},
		}).then((result) => {
			if (result.isConfirmed) {
				// Llamar a la función para activar/desactivar usuario
				toggleProductStatus(producto_id);
			}
		});
	};

	const toggleProductStatus = async (producto_id) => {
		let admin = true;
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.onmouseenter = Swal.stopTimer;
				toast.onmouseleave = Swal.resumeTimer;
			},
			customClass: {
				popup: "my-toast",
			},
		});
		try {
			setIsLoading(true); // Establece isLoading a true al inicio de la operación

			//Mostrar SweetAlert como un toast mientras se espera la respuesta de la promesa
			Swal.fire({
				title: "Enviando...",
				icon: "info",
				showConfirmButton: false,
				toast: true,
				position: "top-end",
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading();
				},
			});

			// Envía la solicitud al servidor para cambiar el estado del producto
			const body = {
				producto_id: producto_id.toString(),
			};

			const response = await dispatch(productStatusChange(body));
			// const response = await axios.put(`${URL_PRODUCT}`, body);
			// console.log(result)
			//console.log('response',response.payload)

			if (response.payload) {
				//console.log('registrado con exito!', response.payload)
				// Swal.close();
				// Actualiza el estado isLoading y muestra una notificación de éxito

				setIsLoading(false);

				Toast.fire({
					icon: "success",
					title: `Estado del producto ${response.payload} actualizado exitosamente.`,
				});

				dispatch(getAllProducts(admin));
			} else {
				// Muestra una notificación de error si la respuesta no es satisfactoria
				setIsLoading(false);
				Toast.fire({
					icon: "error",
					title: "No fue posible activar/desactivar el producto.",
				});
			}
		} catch (error) {
			// Maneja el error y muestra una notificación de error
			setIsLoading(false);
			console.log("Error al intentar activar/desactivar el producto", error);
			Toast.fire({
				icon: "error",
				title: "No fue posible activar/desactivar el producto.",
			});
		} finally {
			// Cierra el SweetAlert
			// Swal.close();
		}
	};

	const toggleProductStandOut = async (producto_id, inactivo, destacado) => {
		if(inactivo == true && destacado == false){
			Swal.fire({
				title: "No se puede destacar el producto",
				text: "El producto está inactivo",
				icon: "error",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "Aceptar",
				customClass: {
				  popup: "my-toast",
				},
			  });
		}else{
		let admin = true;
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.onmouseenter = Swal.stopTimer;
				toast.onmouseleave = Swal.resumeTimer;
			},
			customClass: {
				popup: "my-toast",
			},
		});
		try {
			setIsLoading(true); // Establece isLoading a true al inicio de la operación

			//Mostrar SweetAlert como un toast mientras se espera la respuesta de la promesa
			Swal.fire({
				title: "Enviando...",
				icon: "info",
				showConfirmButton: false,
				toast: true,
				position: "top-end",
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading();
				},
			});

			// Envía la solicitud al servidor para cambiar el estado del producto
			const body = {
				producto_id: producto_id.toString(),
			};
			const response = await dispatch(productStandOutChange(body));
			if (query.length > 0) {
				console.log(query);
				dispatch(getProductsByName(query, admin));
			}
			if (response.payload) {
				setIsLoading(false);

				Toast.fire({
					icon: "success",
					title: `Estado del producto ${response.payload} actualizado exitosamente.`,
				});

				dispatch(getAllProducts(admin));
			} else {
				// Muestra una notificación de error si la respuesta no es satisfactoria
				setIsLoading(false);
				Toast.fire({
					icon: "error",
					title: "Error al activar/desactivar el producto destacado.",
				});
			}
		} catch (error) {
			// Maneja el error y muestra una notificación de error
			console.log("error")
			setIsLoading(false);
			Toast.fire({
				icon: "error",
				title: "No fue posible activar/desactivar el producto destacado.",
			});
		} finally {
			// Cierra el SweetAlert
			// Swal.close();
		}
		}
	};

	const handleInput = (value) => {
		setQuery(value);
	};

	//Optimiza la busqueda espera unos segundos antes de hacer el fetch
	useEffect(() => {
		let admin = true;
		const identifier = setTimeout(() => {
			if (query.length > 0) {
				dispatch(getProductsByName(query, admin));
			} else {
				dispatch(getAllProducts(admin));
			}
		}, 500);

    return () => {
      // console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [query]);
    
  useEffect(() => {
    if (!productos) {
      // Los productos aún no se han cargado, establece el estado de carga en true
      setPageLoading(true);
    } else {
      // Los productos se han cargado, establece el estado de carga en false
      setPageLoading(false);
      if (!toastShown) {
        // Muestra la notificación solo si aún no se ha mostrado
        Toast.fire({
          icon: "info",
          title: "Productos cargados con éxito.",
        });
        // Marca la notificación como mostrada
        setToastShown(true);
      }
    }
  }, [productos, toastShown]);
  

  return (
    <div className="bg-white mt-3 sm:mt-0">
    {pageLoading && <LoadingView />}
      
      {!pageLoading && productos && (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-36 lg:py-28 lg:max-w-7xl lg:px-8">
          <h2 className=" text-xl  font-semibold mb-4">Lista de Productos</h2>

          <div className="flex flex-col sm: gap-y-4 sm:flex-row gap-x-3 justify-evenly sm:justify-end items-center  sm:space-x-4 pb-4 ">
            <Input
              type="text"
              placeholder="Busca aquí..."
              className="flex items-center  w-100 h-23 ring-1 ring-gray-500"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <select
              name="ordenarpor"
              className="border border-black hover:cursor-pointer   rounded px-5  focus:ring-black focus:border-black-500  bg-white py-3 pl-3 pr-10 text-left"
              onChange={handleOrdenar}
              value={ordernarPor}
            >
              {relevancias.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

						<Button
							className="flex items-center justify-center bg-white text-black  ring-1 hover:bg-sky-500  ring-black  p-6 "
							onClick={handleOpenModal}>
							<img src={filterIcon} alt="filter icon" className="w-4 h-6 " />
							<span className="p-2">FILTROS</span>
						</Button>
					</div>
					{productos && productos.productos.length === 0 && (
						<div className="py-20 text-center text-xl fold-semibold">
							<h2>No se encontraron resultados</h2>
						</div>
					)}

					<div className="table w-full border-collapse sm:flex-col">
						<div className="table-header-group bg-gray-50">
							<div className="table-row">
								<div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
									Imagen
								</div>
								<div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
									Nombre
								</div>
								<div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
									Género
								</div>
								<div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
									Stock
								</div>
								<div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
									Precio
								</div>
								<div className="table-cell text-center px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
									Acciones
								</div>
							</div>
						</div>
						<div className="table-row-group  rounded border">
							{productos &&
								productos.productos.map((product) => (
									<div key={product.producto_id} className="table-row">
										<div className="table-cell px-6 py-4 whitespace-nowrap">
											<img
												src={product.imagen_principal}
												alt={product.nombre}
												className="h-12 w-12 object-cover rounded"
											/>
										</div>
										<div className="table-cell px-6 py-4 whitespace-nowrap">
											{product.nombre}
										</div>
										<div className="table-cell px-6 py-4 whitespace-nowrap max-w-12 overflow-hidden text-ellipsis">
											{product.genero==='universal' ? 'Unisex' : product.genero}
										</div>
										<div className="table-cell px-6 py-4 whitespace-nowrap max-w-12 overflow-hidden text-ellipsis">
											{saldoStock(product.stock)}
										</div>
										<div className="table-cell px-6 py-4 whitespace-nowrap">
											$ {numberMaskUnit(product.precio)}
										</div>
										<div className="table-cell px-12 py-4 whitespace-nowrap items-center relative ">
											<button>
												{!product.destacado ? (
													<img
														className="h-6 w-6 rounded-full hover:cursor-pointer mr-2 inline-block "
														src={noDestacado}
														onClick={() =>
															toggleProductStandOut(product.producto_id, product.inactivo, product.destacado)
														}
														alt=""
													/>
												) : (
													<img
														className="h-6 w-6 border-red-400 rounded-full  hover:cursor-pointer mr-2 inline-block "
														src={destacado}
														onClick={() =>
															toggleProductStandOut(product.producto_id, product.inactivo, product.destacado)
														}
														alt={""}
													/>
												)}
											</button>

                      <Link to={`/producto/detalle/${product.producto_id}`}>
                        <button className="text-indigo-600 ring-1 rounded hover:bg-blue-500 hover:text-white text-center w-[83px] mr-2">
                          Ver
                        </button>
                      </Link>
                       <Link to={`../editproduct/${product.producto_id}`}>
                      <button  className="text-yellow-600 ring-1 rounded hover:bg-yellow-600 hover:text-white w-[83px] mr-2">
                        Editar
                      </button>
                       </Link>

											{product.inactivo ? (
												<button
													onClick={() =>
														handleLogicDelete(product.producto_id, true)
													}
													className="text-white w-22 h-6 pl-2 pr-2 ring-1 rounded bg-red-500 hover:bg-white hover:text-red-500 hover:cursor-pointer">
													Inactivo
												</button>
											) : (
												<button
													onClick={() =>
														handleLogicDelete(product.producto_id, false)
													}
													className="text-white w-22 h-6 pl-2 pr-2 ring-1 w-[78px] rounded bg-blue-500 hover:bg-white hover:text-blue-500 hover:cursor-pointer">
													Activo
												</button>
											)}
										</div>
									</div>
								))}
						</div>
					</div>

					<PaginationControls filtros={filtrosAplicados} rol={true} />
				</div>
			)}

			<FilterOptions
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onApplyFilters={handleApplyFilters}
				className={`transition-transform sm:transition-opacity duration-300 ease-in-out ${isModalOpen ? "translate-x-0 md:opacity-100" : "-translate-x-full md:opacity-0 md:pointer-events-none"}`}
			/>
		</div>
	);
}
