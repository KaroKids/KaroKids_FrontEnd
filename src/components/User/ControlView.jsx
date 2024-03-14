import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { getUserByEmail } from "@/redux/userAction";
import { useDispatch, useSelector } from "react-redux";

const ControlView = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { photoURL, email } = auth.user;
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getUserByEmail(email));
  }, []);

  return (
    <div className="flex flex-col items-center justify-evenly rounded border-2  w-full h-auto md:h-[500px]">
      {user.nombre_usuario ? (
        <>
          <div className="mt-4 rounded-full   ">
            {photoURL ? (
              <img
                src={`${photoURL}`}
                className="rounded-full w-[200px]  lg:w-[250px]"
              />
            ) : (
              <img
                src="/assets/panel-icons/user-profile.svg"
                className="bg-slate-200 rounded-full w-[200px] md:w-[250px]"
              />
            )}
          </div>
          <div className="flex flex-col justify-evenly  px-2  w-auto  md:w-auto h-auto xl:h-60 mt-4">
            <div className="flex flex-row ">
              <h1 className="text-base md:text-lg font-bold">Nombre:</h1>
              <label className=" text-sm md:text-lg ml-2">
                {user.nombre_usuario}
              </label>
            </div>
            <div className="flex flex-row ">
              <h1 className="text-base md:text-lg font-bold">Apellido:</h1>
              <label className=" text-sm md:text-lg ml-2">
                {user.apellido_usuario}
              </label>
            </div>
            <div className="flex flex-row ">
              <h1 className="text-base md:text-lg font-bold">Email:</h1>
              <label className=" text-sm md:text-lg ml-2">
                {user.email_usuario}
              </label>
            </div>

            <Link to="/usuario/datos-personales">
              <Button variant="detail" className="w-full my-2 text-white">
                Modificar
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="  animate-pulse ">
            <div className="flex mt-4 rounded-full xl:w-80 justify-center">
              <img
                src="/assets/panel-icons/user-profile.svg"
                className="bg-slate-200 rounded-full w-[200px] md:w-[250px]"
              />
            </div>
            <div className="flex flex-col justify-evenly rounded-md bg-gray-300  px-2  w-64 xl:w-auto my-4 h-auto xl:h-48 mt-4">
              <div className="flex flex-row ">
                <h1 className="bg-gray-500 mt-2 h-4 w-14 md:text-lg font-bold"></h1>
                <label className=" text-sm mt-2 bg-gray-400 h-4 w-full md:text-lg ml-2"></label>
              </div>
              <div className="flex flex-row ">
                <h1 className="text-base my-2 bg-gray-500 h-4 w-14 md:text-lg font-bold"></h1>
                <label className=" text-sm my-2 bg-gray-400 h-4 w-full md:text-lg ml-2"></label>
              </div>
              <div className="flex flex-row ">
                <h1 className="text-base bg-gray-500 h-4 w-14 md:text-lg font-bold"></h1>
                <label className=" text-sm bg-gray-400 h-4 w-full md:text-lg ml-2"></label>
              </div>

              <Button className="w-full my-2 bg-slate-500 text-white"></Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ControlView;
