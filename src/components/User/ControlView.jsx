import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const ControlView = () => {
  const auth = useAuth();
  const { displayName, email, photoURL, phoneNumber } = auth.user;
  console.log(auth.user);
  const FirstName = displayName?.split(" ")[0];
  const LastName = displayName?.split(" ")[1];
  return (
    <div className="flex flex-col items-center justify-evenly rounded border-2  w-full h-full md:h-[500px]">
      <div className="mt-4 rounded-full">
        <img src={photoURL} className="rounded-full w-[200px] md:w-[250px]" />
      </div>
      <div className="flex flex-col justify-evenly  px-2  w-full  md:w-96  h-60 mt-4">
        <div className="flex flex-row ">
          <h1 className="text-base md:text-lg">Nombre:</h1>
          <label className=" text-sm md:text-lg ml-6">{FirstName}</label>
        </div>
        <div className="flex flex-row ">
          <h1 className="text-base md:text-lg">Apellido:</h1>
          <label className=" text-sm md:text-lg ml-6">{LastName}</label>
        </div>
        <div className="flex flex-row ">
          <h1 className="text-base md:text-lg">Email:</h1>
          <label className=" text-sm md:text-lg ml-6">{email}</label>
        </div>
        <div className="flex flex-row ">
          <h1 className="text-base md:text-lg">N° de telefono:</h1>
          <label className=" text-sm md:text-lg ml-6">
            {phoneNumber} +54 3795214133
          </label>
        </div>
        <Link to="/usuario/datos-personales">
          <Button variant="outline" className="w-full">
            Modificar
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ControlView;
