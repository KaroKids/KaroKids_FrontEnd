import { useState } from "react";
import validation from "../../utils/validation";
import { Link } from "react-router-dom";
import { postProduct } from "@/redux/productosActions";
import { useDispatch } from "react-redux";
import UploadImage from "../UploadImage/UploadImage";
import Swal from "sweetalert2";
import spinner from "/assets/images/spinner.svg";

const CreateProduct = () => {
  const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2000,
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
    video: "",
    precio: "",
    edad: "",
    genero: "",
    destacado: false,
    inactivo: false,
    stock: [],
  };
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);

  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState({
    nombre: "",
    descripcion: "",
    imagen_principal: "",
    imagenes_secundarias: [],
    video: "",
    precio: "",
    edad: "",
    genero: "",
    destacado: false,
    inactivo: false,
    stock: {},
  });

  const [newStock, setNewStock] = useState({
    size: "",
    color: "",
    cantidad: "",
  });
  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  
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
    } else {
      // Si no es un campo relacionado con el stock ni con la edad, actualiza el estado normalmente
      setData({ ...data, [property]: value });
    }
  
    setErrors(validation({ ...data, [property]: value }));
  };
  

  const handleSubmit =async (e) => {
    console.log("handleSubmit");
    console.log('Datos:',data);
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        setIsloading(true)
        const response = await  dispatch(postProduct(data));
        console.log('Respuesta del dispatch:', response);

        if(response.payload) {
          setIsloading(false);
          Toast.fire({
            icon: "success",
            title: "Producto registrado con exitosamente!",
           })
           setData(initData);
        } else {
          setIsloading(false)
          Toast.fire({
            icon: "error",
            title: "No fue posible registrar el producto!",
           })
        }

      } catch (error) {
        console.log('Error guardando el producto', error)
      }
    } else {
      setErrors({
        ...errors,
      });
    }
  };

  // const createProduct = ()=>{
  //    console.log('Will save the data...:',data);

  //    try {

  //    } catch (error) {
  //      console.log('Error creating product:', error)
  //    }

  // }

  const handleNewStockChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;

    setNewStock({ ...newStock, [property]: value });
  };

  const handleInputStock = () => {
    const { size, color, cantidad } = newStock;

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

    // Restablecer el estado de newStock
    setNewStock({
      size: "",
      color: "",
      cantidad: "",
    });
  };

  //Estas funciones reciben el hash (imagen en Base64) que llega por props desde el componente UploadImage y setean los valores de imagen_principal e imagenes_secundarias que se van a enviar como "data" al Back.
  const getImagenPrincipal = (imagenPrincipal) => {
    setData({ ...data, imagen_principal: imagenPrincipal });
    //console.log("imagen Princiapl en CreateProduct:", imagenPrincipal);
  };

  //Esta función realiza una copia del estado de la propiedad "imagenes_secundarias" de "data" y actualiza su valor agregándole el último archivo recibido desde el componente UploadImage.
  const getImagSecundarias = (imagSecundarias) => {
    let copia = data.imagenes_secundarias;
    copia.push(imagSecundarias);
    setData({ ...data, imagenes_secundarias: copia });
   // console.log("imagen Secundaria en CreateProduct:", imagSecundarias);
  };


  console.log('Data qeu va a viajar en trolebus al Back: ', data)
  return (
    <div className="mx-auto max-w-4xl  px-10 py-24  sm:py-32 lg:px-8  ">
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
      <div className="mx-auto max-w-2xl text-center">
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
              {errors.nombre && (
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
                {errors.descripcion && (
                  <p className="mt-1  text-left text-small text-red-500 ">
                    {errors.descripcion}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <UploadImage
          onGetImagenPrincipal={getImagenPrincipal}
          onGetImagSecundarias={getImagSecundarias}
        />

        <div className="w-full  mt-5">
          <label
            htmlFor="video"
            className="block text-sm mb-2 font-semibold leading-6 text-gray-900"
          >
            Video:
          </label>
          <input
            id="video"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            type="text"
            name="video"
            value={data.video}
            onChange={handleChange}
            placeholder="URL Video..."
          />
          <div className="flex flex-row justify-start items-center border-none mx-1  ">
            {errors.video && (
              <p className="mt-1  text-left text-small text-red-500">
                {errors.video}
              </p>
            )}
          </div>
        </div>

      
      
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-3 sm:flow-col mt-5">
        <div >
          <label
            htmlFor="precio"
            className="block text-sm font-semibold leading-6 text-gray-900">
         
            Precio:
          </label>
          <div className="mt-2.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              id="precio"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="number"
              name="precio"
              value={data.precio}
              onChange={handleChange}
              placeholder="0.00"
            />
            <div className="flex flex-row justify-start items-center border-none mx-1">
              {errors.precio && (
                <p className="mt-1  text-left text-small text-red-500">
                  {errors.precio}
                </p>
              )}
            </div>
          </div>
        </div>
          <div>
              <label htmlFor="edad" 
               className="block text-sm font-semibold leading-6 text-gray-900">
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
                  <option value="otros">Otros</option>
                </select>
              </div>
              {errors.edad && (
              <p className="mt-1  text-left text-small text-red-500">
                {errors.edad}
              </p>
            )}
            </div>

             <div>  
              <label htmlFor="edad" 
                className="block text-sm font-semibold leading-6 text-gray-900">
                Genero:
              </label>
              <div className="mt-2.5">
                <select
                  id="genero"
                  name="genero"
                  autoComplete="genero"
                  checked={data.genero}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                  <option value="">Seleccionar Género</option>
                  <option value="chico">Chico (Niño)</option>
                  <option value="chica">Chica (Niña)</option>
                  <option value="universal">Universal</option>
                </select>
              </div>
              {errors.genero && (
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
                <label htmlFor="destacado" className="font-medium text-gray-900">
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
                <label
                  htmlFor="inactivo"
                  className="font-medium text-gray-900"
                >
                  Inactivo
                </label>
                <p className="text-gray-500">
                  Si es inactivo, el producto no se encuentra disponible para la
                  venta .
                </p>
              </div>
              <div className="flex flex-row justify-start items-center border-none mx-1 ">
                {errors.inactivo && (
                  <p className="mt-1  text-left text-small text-red-500">
                    {errors.inactivo}
                  </p>
                )}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-1 mt-7  gap-y-6 sm:grid-cols-3">
          <legend className="text-sm mb-5  font-semibold leading-6 text-gray-900">
            Existencia del Producto (Stock):
          </legend>

          <div>
            <label
              htmlFor="size"
              className="block text-sm mb-2 font-semibold leading-6 text-gray-900"
            >
              Tamaño
            </label>
            <select
              id="size"
              name="size"
              value={newStock.size}
              onChange={handleNewStockChange}
              className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Selecciona un tamaño</option>
              <option value="S">Pequeño</option>
              <option value="M">Mediano</option>
              <option value="L">Grande</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="color"
              className="block text-sm mb-2 font-semibold leading-6 text-gray-900"
            >
              Color
            </label>
            <select
              id="color"
              name="color"
              value={newStock.color}
              onChange={handleNewStockChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Selecciona un color</option>
              <option value="red">Rojo</option>
              <option value="blue">Azul</option>
              <option value="black">Negro</option>
              <option value="azul">Azul</option>
              <option value="pink">Pink</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="cantidad"
              className="block text-sm mb-2 font-semibold leading-6 text-gray-900"
            >
              Cantidad
            </label>
            <input
              id="cantidad"
              type="number"
              name="cantidad"
              value={newStock.cantidad}
              onChange={handleNewStockChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Cantidad"
            />
          </div>
        </fieldset>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleInputStock}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition hover:scale-110 text-blue-500 bg-white-600 ring-1  focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white hover:bg-blue-500 focus:ring-blue-500"
          >
           Agregar
          </button>
        </div>

        <div className="w-full mt-5  divide-y-2 divide-gray-100">
          <span
            htmlFor="itemsAgregados"
            className="text-sm mt-7 -mb-4 font-semibold leading-6 text-gray-900"
          >
            Items agregados:
          </span>
          {Object.keys(data.stock).map((size) => (
            <div  key={size}>
              <h3 >Tamaño: {size}</h3>
              <ul>
                {data.stock[size].map((item, index) => (
                  <div key={index}>
                    <span>
                      {" "}
                      Color:{" "}
                      <span className={`text-${item.color}-500 font-bold`}>
                        {item.color.charAt(0).toUpperCase() +
                          item.color.slice(1)}
                      </span>{" "}
                      - Cantidad:{" "}
                      <span className="font-bold">{item.cantidad}</span>
                    </span>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-row  justify-center gap-10  items-center mt-6 ">
         
        <button
   className={`bg-white text-blue-500 w-[160px] h-[40px] rounded-md cursor-pointer ${isLoading ? '' : 'hover:bg-blue ring-1 hover:ring-blue hover:text-white transition hover:scale-110 hover:bg-sky-400'} ${isLoading ? 'opacity-50 cursor-not-allowed ring-1' : ''}`}
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
    'CREAR'
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
