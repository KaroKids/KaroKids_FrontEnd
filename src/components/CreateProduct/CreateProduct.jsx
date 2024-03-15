import { useEffect, useState, Fragment } from "react";
import validation from "../../utils/validation";
import { Link } from "react-router-dom";
import { postProduct } from "@/redux/productosActions";
import { useDispatch } from "react-redux";
import UploadImage from "../UploadImage/UploadImage";
import Swal from "sweetalert2";
import spinner from "/assets/images/spinner.svg";
import { numeroEnPalabras } from "@/utils/numerosEnPalabras";
import Colores from "./Colores";
import coloresTailwind from "@/utils/coloresTailwind";

import { numberMask, numberMaskUnit } from "@/utils/numberMask";

const CreateProduct = () => {
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
  const initData = {
    nombre: "",
    descripcion: "",
    imagen_principal: "",
    imagenes_secundarias: [],
    precio: 0,
    edad: "",
    genero: "",
    destacado: false,
    inactivo: false,
    stock: {},
  };
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);

  const [limpiar, setLimpiar] = useState(false);
  const [limpio, setLimpio] = useState(true);
  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState({
    nombre: "",
    descripcion: "",
    imagen_principal: "",
    imagenes_secundarias: [],
    precio: "",
    edad: "",
    genero: "",
    destacado: false,
    inactivo: false,
    stock: {},
    msgData: "",
  });

  const newStockInit = { size: "", color: "", cantidad: 1, total: 0 };

  const [newStock, setNewStock] = useState(newStockInit);

  const handleChange = (e) => {
    const property = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (property === "edad") {
      // Si el cambio es en el campo de edad, actualiza directamente el valor de data.edad
      setData({ ...data, [property]: value });
    } else if (property === "stock") {
      // Si es un campo relacionado con el stock
      const stockProperty = e.target.dataset.stockProperty;
      const updatedStock = { ...data.stock };
      updatedStock[value] = {
        ...updatedStock[value],
        [stockProperty]: e.target.value,
      };
      setData({ ...data, stock: updatedStock });
    } else if (property === "precio") {
      // Si es el campo de precio, formatea el valor antes de actualizar el estado
      const formattedValue = value.replace(/,/g, "");
      setData({ ...data, [property]: formattedValue });
    } else {
      // Si no es un campo relacionado con el stock, ni con la edad, ni con el precio,
      // actualiza el estado normalmente
      setData({ ...data, [property]: value });
    }

    setErrors(validation({ ...data, [property]: value }, { newStock }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Realizar la validación inicial
    const validationErrors = validation(data, newStock);
    setErrors(validationErrors);

    // Verificar si hay errores de validación
    if (!validationErrors.msgData) {
      try {
        setIsloading(true);
        const response = await dispatch(postProduct(data));

        if (response.payload) {
          setIsloading(false);
          Toast.fire({
            icon: "success",
            title: "Producto registrado con éxito!",
          });
          setData(initData);
          setErrors(validation(data));
          setLimpio(false);
          setLimpiar(!limpiar);
        } else {
          setIsloading(false);
          Toast.fire({
            icon: "error",
            title: "No fue posible registrar el producto!",
          });
        }
      } catch (error) {
        setIsloading(false);
        Toast.fire({
          icon: "error",
          title: "No fue posible registrar el producto!",
        });
      }
    } else {
      // Mostrar errores de validación
      Toast.fire({
        icon: "error",
        title: `${validationErrors.msgData}, favor intenta nuevamente!`,
      });
    }
  };

  const handleNewStockChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setNewStock({ ...newStock, [property]: value });
    setErrors(validation({ ...data, [property]: value }, { newStock }));
  };

  const handleInputStock = () => {
    const { size, color, cantidad, total } = newStock;
    const newTotal = total + parseInt(cantidad); // Calcular el nuevo total sumando la cantidad actual

    // Crear un nuevo objeto de stock con la estructura deseada
    const newStockItem = { color, cantidad };
    const updatedStock = { ...data.stock };

    if (size in updatedStock) {
      // Si ya existe el tamaño en el stock, agregue el nuevo artículo al arreglo existente
      updatedStock[size].push(newStockItem);
    } else {
      // Si no existe el tamaño en el stock, cree un nuevo objeto con el nuevo artículo
      updatedStock[size] = [newStockItem];
    }

    // Actualizar el estado con el nuevo stock
    setData({ ...data, stock: updatedStock });
    setErrors(validation(data, newStock));

    // Restablecer el estado de newStock
    setNewStock({
      ...newStock,
      total: newTotal,
      // size: "",
      //  color: "",
      //  cantidad: 1,
    });
  };

  //Estas funciones reciben el hash (imagen en Base64) que llega por props desde el componente UploadImage y setean los valores de imagen_principal e imagenes_secundarias que se van a enviar como "data" al Back.
  const getImagenPrincipal = (imagenPrincipal) => {
    setData({ ...data, imagen_principal: imagenPrincipal });
    setErrors(validation(data, newStock));
  };

  //Esta función realiza una copia del estado de la propiedad "imagenes_secundarias" de "data" y actualiza su valor agregándole el último archivo recibido desde el componente UploadImage.
  const getImagSecundarias = (imagSecundarias) => {
    let copia = data.imagenes_secundarias;
    copia.push(imagSecundarias);
    setData({ ...data, imagenes_secundarias: copia });
    setErrors(validation(data, newStock));
  };

  useEffect(() => {
    setErrors(validation(data, newStock));
  }, [data]);

  useEffect(() => {
    if (limpiar === true || limpiar === false) {
      setLimpio(true);
    }
  }, [limpiar]);

  useEffect(() => {
    // Realizar la validación solo cuando el usuario interactúe con el formulario
    if (Object.keys(errors).length === 0) {
      setErrors(validation(data, newStock));
    }
  }, [data]);

  const opcionesColores = Object.entries(coloresTailwind).map(
    ([key, value]) => (
      <option key={key} value={key}>
        {value.front}
      </option>
    )
  );

  return (
    <div className="mx-auto max-w-4xl   px-10 py-24  sm:py-32 lg:px-8  ">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl -mt-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Registrar Producto
        </h2>
      </div>
      <form
        encType="multipart/form-data"
        className="mx-auto mt-16 max-w-xxl sm:mt-20  "
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nombre
            </label>
            <div className="mt-2.5">
              <input
                id="nombre"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                name="nombre"
                value={data.nombre}
                onChange={handleChange}
                placeholder="Nombre del producto..."
              />
            </div>
            <div className="flex flex-row justify-start items-center border-none mx-1 ">
              {errors?.nombre && (
                <p className="mt-1  text-left text-small text-red-500 ">
                  {errors.nombre}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Descripcion
            </label>
            <div className="mt-2.5">
              <input
                id="descripcion"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                name="descripcion"
                value={data.descripcion}
                onChange={handleChange}
                placeholder="Descripcion del producto..."
              />
              <div className="flex flex-row justify-start items-center border-none mx-1 ">
                {errors?.descripcion && (
                  <p className="mt-1  text-left text-small text-red-500 ">
                    {errors.descripcion}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {limpio && (
          <UploadImage
            onGetImagenPrincipal={getImagenPrincipal}
            onGetImagSecundarias={getImagSecundarias}
            errors={errors}
          />
        )}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-3 sm:flow-col mt-5">
          <div>
            <label
              htmlFor="precio"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Precio:
            </label>

            <div className="mt-2.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                id="precio"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                name="precio"
                value={data.precio ? numberMaskUnit(data.precio) : ""}
                onChange={handleChange}
                placeholder="0.00"
              />
              <div className="flex flex-row justify-start items-center border-none mx-1">
                {errors.precio && (
                  <p className="mt-1  text-left text-small text-red-500">
                    {errors?.precio}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="edad"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Rango de Edad:
            </label>
            <div className="mt-2.5">
              <select
                id="edad"
                name="edad"
                onChange={handleChange}
                value={data.edad}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Seleccionar Edad</option>
                <option value="recien_nacido">Recién Nacido</option>
                <option value="bebe">Bebe</option>
                <option value="infantil">Infantíl</option>
                <option value="junior">Junior</option>
              </select>
            </div>
            {errors?.edad && (
              <p className="mt-1  text-left text-small text-red-500">
                {errors.edad}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="genero"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Genero:
            </label>
            <div className="mt-2.5">
              <select
                id="genero"
                name="genero"
                value={data.genero}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Seleccionar Género</option>
                <option value="chico">Chico (Niño)</option>
                <option value="chica">Chica (Niña)</option>
                <option value="universal">Unisex</option>
              </select>
            </div>
            {errors?.genero && (
              <p className="mt-1  text-left text-small text-red-500">
                {errors.genero}
              </p>
            )}
          </div>
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm  font-semibold leading-6 text-gray-900">
            Estados del Producto:
          </legend>
          <div className="mt-3 space-y-6">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="destacado"
                  name="destacado"
                  type="checkbox"
                  checked={data.destacado}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="destacado"
                  className="font-medium text-gray-900"
                >
                  Destacado
                </label>
                <p className="text-gray-500">
                  El producto se encuentra en la lista de destacados.
                </p>
              </div>
              <div className="flex flex-row justify-start items-center border-none mx-1 ">
                {errors.destacado && (
                  <p className="mt-1  text-left text-small text-red-500">
                    {errors.destacado}
                  </p>
                )}
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="inactivo"
                  name="inactivo"
                  type="checkbox"
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="inactivo" className="font-medium text-gray-900">
                  Inactivo
                </label>
                <p className="text-gray-500">
                  Si es inactivo, el producto no se encuentra disponible para la
                  venta .
                </p>
              </div>
              <div className="flex flex-row justify-start items-center border-none mx-1 ">
                {errors?.inactivo && (
                  <p className="mt-1  text-left text-small text-red-500">
                    {errors.inactivo}
                  </p>
                )}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-1 gap-x-4 mt-7 gap-y-6 sm:grid-cols-3">
          <legend className="text-sm mb-5 font-semibold leading-6 text-gray-900">
            Existencia del Producto (Stock):
          </legend>

          <div className="flex flex-col mt-2">
            <label
              htmlFor="size"
              className="block text-sm mb-2 font-semibold leading-6 text-gray-900"
            >
              Talla:
            </label>
            <select
              id="size"
              name="size"
              value={newStock.size}
              onChange={handleNewStockChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Selecciona una talla</option>
              <option value="S">Pequeño</option>
              <option value="M">Mediano</option>
              <option value="L">Grande</option>
            </select>
            {errors && errors.stock && errors.stock[0]?.talla && (
              <p className="mt-1 text-left text-sm text-red-500">
                {!newStock.size ? errors?.stock[0].talla : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col mt-2">
            <label
              htmlFor="color"
              className="block text-sm mb-2 font-semibold leading-6 text-gray-900"
            >
              Color:
            </label>
            <select
              id="color"
              name="color"
              value={newStock.color}
              onChange={handleNewStockChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option selected value="">
                Selecciona un color
              </option>
              {opcionesColores}
            </select>
            {errors && errors.stock && errors.stock[1]?.color && (
              <p className="mt-1 text-left text-sm text-red-500">
                {!newStock.color ? errors?.stock[1].color : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col mt-2">
            <label
              htmlFor="cantidad"
              className="block text-sm mb-2 font-semibold leading-6 text-gray-900"
            >
              Cantidad:
            </label>
            <input
              id="cantidad"
              type="number"
              name="cantidad"
              value={newStock.cantidad}
              onChange={handleNewStockChange}
              className="block w-full rounded-md border-0 py-1.5  pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Cantidad"
              min={1}
            />
            {errors && errors.stock && errors.stock[2]?.cantidad && (
              <p className="mt-1 text-left text-sm text-red-500">
                {!newStock.cantidad ? errors?.stock[2].cantidad : ""}
              </p>
            )}
          </div>
        </fieldset>
        <div className="flex flex-col justify-end  mt-4  sm:flex-row  sm:items-end">
          <button
            disabled={!newStock.size || !newStock.color || !newStock.cantidad}
            type="button"
            onClick={handleInputStock}
            className={` items-center  px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              !newStock.size || !newStock.color || !newStock.cantidad
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Agregar
          </button>
        </div>
        <div className="w-full mt-5">
          <span
            htmlFor="itemsAgregados"
            className="text-sm mt-7 font-semibold leading-6 text-gray-900"
          >
            Items agregados:
          </span>
          <table className="mt-3 w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border border-gray-200">Talla</th>
                <th className="py-2 px-4 border border-gray-200">Color</th>
                <th className="py-2 px-4 border border-gray-200">Cantidad</th>
                <th className="py-2 px-4 border border-gray-200"></th>{" "}
                {/* Espacio para el botón de eliminar */}
              </tr>
            </thead>
            <tbody>
              {Object.keys(data.stock).map((size) => (
                <Fragment key={size}>
                  {data.stock[size].map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border text-center border-gray-200 font-bold ">
                        {size}
                      </td>

                      <td className="text-center border border-gray-200">
                        <Colores key={index} color={item.color} />
                      </td>
                      <td className="py-2 px-4 border border-gray-200 text-center">
                        <input
                          className="ring-1 ring-blue-400 ring-inset pl-2 w-[80px]"
                          type="number"
                          value={item.cantidad}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            const updatedStock = { ...data.stock };
                            updatedStock[size][index].cantidad = newValue;
                            setData({ ...data, stock: updatedStock });
                          }}
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-200 text-red-500  text-center">
                        <button
                          type="button"
                          onClick={() => {
                            const updatedStock = { ...data.stock };
                            updatedStock[size].splice(index, 1);

                            if (updatedStock[size].length === 0) {
                              delete updatedStock[size];
                              setNewStock(newStockInit);
                            }

                            setData({ ...data, stock: updatedStock });

                            // Actualizar el estado con el nuevo stock
                          }}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mostrar el total */}
        <div className="mt-3 border pr-2 pl-2">
          <span className="font-semibold">Total items:</span>{" "}
          <span className="font-bold">{numberMaskUnit(newStock.total)} </span>
          <span className="font-thin font-italic">
            {" "}
            -{" "}
            {newStock.total > 0
              ? numeroEnPalabras(newStock.total) + " unidad(es)"
              : ""}
            .{" "}
          </span>
        </div>

        <div className="flex flex-row  justify-center gap-10  items-center mt-6 ">
          <button
            className={`bg-white text-blue-500 w-[160px] h-[40px] rounded-md cursor-pointer ${isLoading ? "" : "hover:bg-blue ring-1 hover:ring-blue hover:text-white transition hover:scale-110 hover:bg-sky-400"} ${isLoading ? "opacity-50 cursor-not-allowed ring-1" : ""}`}
            onClick={handleSubmit}
            type="submit"
            name="submit"
            id="submitCreate"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <img className="w-8 h-8" src={spinner} alt="Spinner" />
                <span className="ml-2">Enviando...</span>
              </div>
            ) : (
              "CREAR"
            )}
          </button>

          <Link to="/">
            <span className=" flex items-center justify-center bg-sky-200 w-[160px] h-[40px] rounded-md cursor-pointer transition hover:scale-110 hover:bg-sky-400 hover:text-white">
              VOLVER
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
