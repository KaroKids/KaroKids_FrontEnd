import React from "react";

const PanelUsuario = () => {
  return (
    <div className="container flex flex-col justify-start my-40 items-start  min-h-screen mx-60 ">
      <h1 className="text-3xl font-semibold mb-2">Mi cuenta</h1>
      <div className="flex flex-col items-start border-t-2    border-t-slate-300 h-[500px] py-6  w-full">
        <div className="pt-12 px-2 bg-slate-100   h-full w-80 border-b-2 border-b-slate-300">
          <h1 className="text-left mb-10 text-xl font-medium">Hola lautaro!</h1>
          <p className="text-start text-slate-400">
            Desde Mi Cuenta puedes ver un resumen de tus actividades recientes y
            actualizar tu informacion.
          </p>
        </div>
        <ul className="flex flex-col bg-slate-100  justify-evenly items-start pl-2 h-full  w-80">
          <li className="text-slate-400">
            <h2>Panel de Control</h2>{" "}
          </li>
          <li className="text-slate-400">
            <h2>Datos Personales</h2>{" "}
          </li>
          <li className="text-slate-400">
            <h2>Mis pedidos</h2>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PanelUsuario;
