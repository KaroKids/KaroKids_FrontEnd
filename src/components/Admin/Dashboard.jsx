import { useEffect, useState } from 'react'

import { useAuth } from "@/context/AuthContext";
import DatosPersonales from '../User/DatosPersonales';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderDashBoard from './HeaderDashBoard';
import clsx from 'clsx';
import Stats from './Stats';



// const userNavigation = [
//   { name: 'Ver Pefil', component: <DatosPersonales /> },
//   { name: 'Configuraciones', component: '#' },
//   { name: 'Salir', component: '#' },
// ]

 

export default function Dashboard() {
  const { pathname } = useLocation();
  const navigate  = useNavigate()


  const auth = useAuth();
  const { displayName,photoURL, email } = auth.user;
  const userName = displayName?.split(" ")[0];
   
  const [user,setUser] = useState(  {
    name: userName,
    email,
    imageUrl:photoURL
     
  })
   

 
   const [menuSelected, setMenuSelected] = useState({
    menu:'Dashboard',
    component:<Stats />
    
   })

useEffect(()=>{
  console.log('select menu',menuSelected);
},[menuSelected])
     
 

useEffect(()=>{
  if (user.name===undefined && pathname==="/admin" ) {
    //Reenvia a la ruta raiz
   navigate('/');
  }
})

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