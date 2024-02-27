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
  console.log(user);

  useEffect(() => {
    dispatch(getUserByEmail(email));
  }, []);

  return (
    <div className="flex flex-col items-center justify-evenly rounded border-2  w-full h-auto md:h-[500px]">
      {user[0].nombre_usuario ? (
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
              <h1 className="text-base md:text-lg">Nombre:</h1>
              <label className=" text-sm md:text-lg ml-4">
                {user[0].nombre_usuario}
              </label>
            </div>
            <div className="flex flex-row ">
              <h1 className="text-base md:text-lg">Apellido:</h1>
              <label className=" text-sm md:text-lg ml-4">
                {user[0].apellido_usuario}
              </label>
            </div>
            <div className="flex flex-row ">
              <h1 className="text-base md:text-lg">Email:</h1>
              <label className=" text-sm md:text-lg ml-4">
                {user[0].email_usuario}
              </label>
            </div>

            <Link to="/usuario/datos-personales">
              <Button variant="outline" className="w-full my-2">
                Modificar
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>...</>
      )}
    </div>
  );
};

export default ControlView;
