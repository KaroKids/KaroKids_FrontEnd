import React, { useState } from "react";
import validation from "../../utils/validation";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [data, setData] = useState({
    nombre: "",
    descripcion: "",
    imagen_principal: "",
    imagenes_secundarias: [],
    video: "",
    precio: 0,
    edad: "",
    genero: "",
    destacado: false,
    inactivo: false,
    talle: "",
    color: "",
    cantidad: "",
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
    talle: "",
    color: "",
    cantidad: "",
  });

  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;

    setData({ ...data, [property]: value });
    setErrors(validation({ ...data, [property]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
    } else {
      setErrors({
        ...errors,
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center bg-sky-100 min-h-screen">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl">FORMULARIO DE CREACION</h1>
      </div>
      <form>
        <div className="flex flex-col items-center shadow-2xl justify-around py-6 w-[600px] h-[800px] rounded-xl bg-slate-200 ">
          <div className="flex flex-row  justify-center items-center border-none p-2 m-0 w-full">
            <label className="pr-2">Nombre:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6 h-[28px]  "
              type="text"
              name="nombre"
              value={data.nombre}
              onChange={handleChange}
              placeholder="Nombre del producto..."
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.nombre && (
                <p className="m-0 w-[60px] text-left text-xs">
                  {errors.nombre}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row  justify-center items-center border-none p-2 m-0 w-full ">
            <label className="pr-2">Descripcion:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6  h-[28px]   "
              type="text"
              name="descripcion"
              value={data.descripcion}
              onChange={handleChange}
              placeholder="Descripcion..."
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.descripcion && (
                <p className="m-0 w-[60px] text-left text-xs">
                  {errors.descripcion}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row  justify-center items-center border-none p-2 m-0  w-full">
            <label className="pr-2">Img Principal:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6 h-[28px]    "
              type="text"
              name="imagen_principal"
              value={data.imagen_principal}
              onChange={handleChange}
              placeholder="URL imagen"
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.imagen_principal && (
                <p className="m-0 w-[60px] text-left text-xs">
                  {errors.imagen_principal}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center border-none p-2 m-0 w-full ">
            <label className="pr-2">Img Secundarias:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6  h-[28px]    "
              type="text"
              name="imagenes_secundarias"
              value={data.imagen_secundaria}
              onChange={handleChange}
              placeholder="URL imagenes siguientes..."
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.imagenes_secundarias && (
                <p className="m-0 w-[60px] text-left text-xs">
                  {errors.imagenes_secundarias}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center border-none p-2 m-0 w-full ">
            <label className="pr-2">Video:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6 h-[28px]   "
              type="text"
              name="video"
              value={data.video}
              onChange={handleChange}
              placeholder="URL Video..."
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.video && (
                <p className="m-0 w-[60px] text-left text-xs">{errors.video}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row justify-center items-center border-none p-2 m-0 w-full  ">
            <label className="pr-2">Precio:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6 h-[28px]    "
              type="number"
              name="precio"
              value={data.precio}
              onChange={handleChange}
              placeholder="Precio del producto..."
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.precio && (
                <p className="m-0 w-[60px] text-left text-xs">
                  {errors.precio}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row justify-center items-center border-none p-2 m-0 w-full">
            <label className="pr-2">Edad:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6 h-[28px] "
              type="text"
              name="edad"
              value={data.edad}
              onChange={handleChange}
              placeholder="bebe - infatil...."
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {" "}
              {errors.edad && (
                <p className="m-0 w-[60px] text-left text-xs">{errors.edad}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center border-none p-2 m-0 w-full ">
            <label className="pr-2">Genero:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6 h-[28px]   "
              type="text"
              name="genero"
              value={data.genero}
              onChange={handleChange}
              placeholder="Chico o Chica"
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.genero && (
                <p className="m-0 w-[60px] text-left text-xs">
                  {errors.genero}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center border-none p-2 m-0 w-full ">
            <label className="pr-2">Destacado:</label>
            <input
              type="checkbox"
              name="destacado"
              value={data.destacado}
              onChange={handleChange}
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.destacado && (
                <p className="m-0 w-[60px] text-left text-xs">
                  {errors.destacado}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center border-none p-2 m-0 w-full ">
            <label className="pr-2">Inactivo:</label>
            <input
              type="checkbox"
              name="inactivo"
              value={data.inactivo}
              onChange={handleChange}
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.inactivo && (
                <p className="m-0 w-[60px] text-left text-xs">
                  {errors.inactivo}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center border-none p-2 m-0 w-full ">
            <label className="pr-2">Talle:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6 h-[28px]  "
              type="text"
              name="talle"
              value={data.talle}
              onChange={handleChange}
              placeholder="XS, S, M..."
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.talle && (
                <p className="m-0 w-[60px] text-left text-xs">{errors.talle}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center border-none p-2 m-0  w-full ">
            <label className="pr-2">Color:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6 h-[28px]  "
              type="text"
              name="color"
              value={data.color}
              onChange={handleChange}
              placeholder="Rojo, blanco, negro..."
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.color && (
                <p className="m-0 w-[60px] text-left text-xs">{errors.color}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center border-none p-2 m-0 w-full ">
            <label className="pr-2">Cantidad:</label>
            <input
              className="flex rounded-md justify-around items-center text-base  border-2 border-black w-fit px-6 h-[28px]  "
              type="number"
              name="cantidad"
              value={data.cantidad}
              onChange={handleChange}
              placeholder="0"
            />
            <div className="flex flex-row justify-start items-center border-none mx-2 ">
              {errors.cantidad && (
                <p className="m-0 w-[60px] text-left text-xs">
                  {errors.cantidad}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row flex-nowrap justify-around  w-full items-center ">
            <input
              className="bg-sky-200 w-[160px] h-[40px] rounded-md cursor-pointer transition hover:scale-110 hover:bg-sky-400"
              onClick={handleSubmit}
              type="submit"
              name="submit"
              value="CREAR"
              id="submitCreate"
            />
            <Link to="/">
              <span className=" flex items-center justify-center bg-sky-200 w-[160px] h-[40px] rounded-md cursor-pointer transition hover:scale-110 hover:bg-sky-400">
                VOLVER
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
