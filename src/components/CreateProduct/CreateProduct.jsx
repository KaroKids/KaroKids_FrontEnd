import {  useState } from "react";
import validation from "../../utils/validation";
import { Link } from "react-router-dom";
import { postProduct } from "@/redux/productosActions";
import { useDispatch } from "react-redux";
import UploadImage from "../UploadImage/UploadImage";
 

const CreateProduct = () => {
  
  const dispatch = useDispatch();
  const [data, setData] = useState({
    nombre: "",
    descripcion: "",
    imagen_principal: '',
    imagenes_secundarias: [],
    video: "",
    precio: '',
    edad: "",
    genero: "",
    destacado: false,
    inactivo: false,
    stock:[],
  });
  const [errors, setErrors] = useState({
    nombre: "",
    descripcion: "",
    imagen_principal: "",
    imagenes_secundarias: "",
    video: "",
    precio: "",
    edad: "",
    genero: "",
    destacado: false,
    inactivo: false,
    stock:[],
    
  });

  const [newStock, setNewStock] = useState({
    size: '',
    color: '',
    cantidad: ''
  });
  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;

    // Verificar si el campo es 'imagenes_secundarias'
  if (property === 'imagenes_secundarias') {
    // Obtener el valor actual de 'imagenes_secundarias'
    let updatedImages = [...data.imagenes_secundarias];
    // Agregar la nueva URL al array
    updatedImages.push(value);
    // Actualizar el estado
    setData({ ...data, [property]: updatedImages });
  } else {
    // Si no es 'imagenes_secundarias', actualizar el estado normalmente
    setData({ ...data, [property]: value });
  }

   // setData({ ...data, [property]: value });
    setErrors(validation({ ...data, [property]: value }));
  };

  const handleSubmit = (e) => {
    console.log('handleSubmit')
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      createProduct();
    } else {
      setErrors({
        ...errors,
      });
    }
  };

  const createProduct = ()=>{
     console.log('Will save the data...:',data);
     const formData = new FormData();
     formData.append('nombre', data.nombre);
     formData.append('descripcion', data.descripcion);
     formData.append('imagen_principal', data.imagen_principal);
     data.imagenes_secundarias.forEach((imagen) => {
       formData.append('imagenes_secundarias', imagen);
     });
     formData.append('video', data.video);
     formData.append('precio', data.precio);
     formData.append('edad', data.edad);
     formData.append('genero', data.genero);
     formData.append('destacado', data.destacado);
     formData.append('inactivo', data.inactivo);
     formData.append('stock', JSON.stringify(data.stock));

     try {
         dispatch(postProduct(formData));
         
     } catch (error) {
       console.log('Error creating product:', error)
     }


  }

  const handleNewStockChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;

    setNewStock({ ...newStock, [property]: value });
  };

  const handleInputStock = () => {
    setData({
      ...data,
      stock: [...data.stock, newStock]
    });
    setNewStock({
      size: '',
      color: '',
      cantidad: ''
    });
  };

return (
  <div className="  px-6 py-24  sm:py-32 lg:px-8   ">
  <div
    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
    aria-hidden="true"
  >
    <div
      className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    />
  </div>
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Registrar Producto</h2>
     
  </div>
      <form encType="multipart/form-data" className="mx-auto mt-16 max-w-xl sm:mt-20  "> 
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
              <label htmlFor="nombre" className="block text-sm font-semibold leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2.5">

            <input
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
              <label htmlFor="descripcion" className="block text-sm font-semibold leading-6 text-gray-900">
              Descripcion
            </label>
            <div className="mt-2.5">
            <input
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
            <UploadImage />
          <div className="w-full   mt-5"> 
             <label htmlFor="imagen_principal" className="block text-sm mb-2 font-medium leading-6 text-gray-900">
              Imagen Principal
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              name="imagen_principal"
              value={data.imagen_principal}
              onChange={handleChange}
              
              />
            <div className="flex flex-row justify-start items-center border-none mx-1 ">
               {errors.imagen_principal && (
                 <p className="mt-1  text-left text-small text-red-500 ">
                   {errors.imagen_principal}
                 </p>
              )}
              </div>
      </div>

      <div className="w-full mt-5"> 
             <label htmlFor="imagenes_secundarias" className="block text-sm mb-2 font-medium leading-6 text-gray-900">
              Url imagen secundaria
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              name="imagenes_secundarias"
              value={data.imagenes_secundarias}
              onChange={handleChange}
             
              />
            <div className="flex flex-row justify-start items-center border-none mx-1 ">
               {errors.imagenes_secundarias && (
                 <p className="mt-1  text-left text-small text-red-500 ">
                   {errors.imagenes_secundarias}
                 </p>
              )}
              </div>
      </div>

          <div className="w-full  mt-5">
            <label htmlFor="video" className="block text-sm mb-2 font-medium leading-6 text-gray-900">Video:</label>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              type="text"
              name="video"
              value={data.video}
              onChange={handleChange}
              placeholder="URL Video..."
              />
            <div className="flex flex-row justify-start items-center border-none mx-1  ">
              {errors.video && (
                <p className="mt-1  text-left text-small text-red-500">{errors.video}</p>
                )}
            </div>
          </div>

          <div className="w-full mt-5">
          <label htmlFor="precio" className="block text-sm font-medium leading-6 text-gray-900">
          Precio
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      
         </div> 
          <input
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

          <div className="w-full mt-5 ">
            <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">Edad:</label>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              name="edad"
              value={data.edad}
              onChange={handleChange}
              placeholder="bebe - infatil...."
              />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {" "}
              {errors.edad && (
                <p className="mt-1  text-left text-small text-red-500">{errors.edad}</p>
                )}
            </div>
          </div>
          <div className="w-full mt-5  ">
            <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">Genero:</label>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              type="text"
              name="genero"
              value={data.genero}
              onChange={handleChange}
              placeholder="Chico o Chica"
              />
            <div className="flex flex-row justify-start items-center border-none mx-1 ">
              {errors.genero && (
                <p className="mt-1  text-left text-small text-red-500">
                  {errors.genero}
                </p>
              )}
            </div>
          </div >
        
          <div className="flex w-full mt-5  ">
            <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">Destacado:</label>
            <input
              type="checkbox"
              name="destacado"
              value={data.destacado}
              onChange={handleChange}
              className="mr-3"
              />
            <div className="flex flex-row justify-start items-center border-none mx-1 ">
              {errors.destacado && (
                <p className="mt-1  text-left text-small text-red-500">
                  {errors.destacado}
                </p>
              )}
            </div>
          </div>

          <div className="w-full mt-5  ">
            <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">Inactivo:</label>
            <input
             className="pr-2"
              type="checkbox"
              name="inactivo"
              value={data.inactivo}
              onChange={handleChange}
              />
            <div className="flex flex-row justify-start items-center border-none mx-1 ">
              {errors.inactivo && (
                <p className="mt-1  text-left text-small text-red-500">
                  {errors.inactivo}
                </p>
              )}
            </div>
          </div>
       

          {/* <div className="flex-row  mt-5 ">
            <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">Talle:</label>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              type="text"
              name="talle"
              value={data.talle}
              onChange={handleChange}
              placeholder="XS, S, M..."
              />
            <div className="flex flex-row justify-start items-center border-none mx-1 ">
              {errors.talle && (
                <p className="mt-1  text-left text-small text-red-500">{errors.talle}</p>
                )}
            </div>
          </div> */}
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3">
          <div>
            <label htmlFor="size" className="block text-sm font-semibold leading-6 text-gray-900">Tamaño</label>
            <select
              name="size"
              value={newStock.size}
              onChange={handleNewStockChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Selecciona un tamaño</option>
              <option value="S">Pequeño</option>
              <option value="M">Mediano</option>
              <option value="L">Grande</option>
            </select>
          </div>
          <div>
            <label htmlFor="color" className="block text-sm font-semibold leading-6 text-gray-900">Color</label>
            <select
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
            <label htmlFor="cantidad" className="block text-sm font-semibold leading-6 text-gray-900">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={newStock.cantidad}
              onChange={handleNewStockChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Cantidad"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleInputStock}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition hover:scale-110 text-blue-500 bg-white-600 ring-1  focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white hover:bg-blue-500 focus:ring-blue-500"
          >
            Agregar
          </button>
        </div>

        <div className="w-full mt-5">
  <label htmlFor="stock" className="block text-sm mb-2 font-medium leading-6 text-gray-900">Items agregados:</label>
  {data.stock.map((item, index) => (
    <div key={index}>
      <span>Tamaño: {item.size}, Color: {item.color}, Cantidad: {item.cantidad}</span>
    </div>
  ))}
</div>


        
     
          <div className="flex flex-row  justify-center gap-10  items-center mt-6 ">
            <button
            className="bg-white hover:bg-blue ring-1 text-blue-500 w-[160px] h-[40px] rounded-md cursor-pointer transition hover:scale-110 hover:bg-sky-400 hover:text-white"
            onClick={handleSubmit}
            type="submit"
            name="submit"
           
            id="submitCreate"
            >CREAR
            </button>
            
             <Link to="/">
               <span className=" flex items-center justify-center bg-sky-200 w-[160px] h-[40px] rounded-md cursor-pointer transition hover:scale-110 hover:bg-sky-400 hover:text-white">
                 VOLVER
               </span>
             </Link>
           </div>
         </form>
            </div>
        
 
     
        
 
 
 )
}

export default CreateProduct;


 