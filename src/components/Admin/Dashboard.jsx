import { useEffect, useState } from 'react'

import { useAuth } from "@/context/AuthContext";
import DatosPersonales from '../User/DatosPersonales';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderDashBoard from './HeaderDashBoard';
import clsx from 'clsx';
import Stats from './Stats';
import { useSelector } from 'react-redux';
 


export default function Dashboard() {
  const { pathname } = useLocation();
  const navigate  = useNavigate()
  const userLocal = useSelector((state) => state.users.user);

  const auth = useAuth();
  const { displayName,photoURL, email } = auth.user;
  const userName = displayName?.split(" ")[0];
   
  const [user,setUser] = useState(  {
    name: userName,
    email,
    imageUrl:photoURL
     
  })
   

 
   const [menuSelected, setMenuSelected] = useState({})

useEffect(()=>{
 // console.log('select menu',menuSelected);
 
},[menuSelected])
     
 
//Verifica si el usuario loggeado es tien role admin.
useEffect(()=>{
  if (userLocal?.roles!=="admin" ) {
    //Reenvia a la ruta raiz
   navigate('/');
  }
},[userLocal])

//console.log('user admin', userLocal.roles)
const handleLogout = (e) => {
  e.preventDefault();
  auth.logout();
};
 
  
  return (
    <>
      
      <div className="min-h-full">
     
           <HeaderDashBoard updateMenuSelected={setMenuSelected} />
    
       
        <main>
          <div className="mx-auto max-w-7xl mt-auto py-6 sm:px-6 min-h-full lg:px-8">
                      
                        
            {//Aqui renderiza el componente cuando selecciona en el menu.
             
              menuSelected.component
            }

          </div>
          
        </main>
      </div>
    </>
  )
}