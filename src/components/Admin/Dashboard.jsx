import { useState } from 'react'
import { useAuth } from "@/context/AuthContext";
import { useLocation } from 'react-router-dom';
import HeaderDashBoard from './HeaderDashBoard';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';



export default function Dashboard() {
  const { pathname } = useLocation();
  const userLocal = useSelector((state) => state.users.user);
  const auth = useAuth();
  const { displayName,photoURL, email } = auth.user;
  const userName = displayName?.split(" ")[0];
   
  // const [user,setUser] = useState(  {
  //   name: userName,
  //   email,
  //   imageUrl:photoURL
     
  // })

  return (
    <>
      
      <div className="min-h-full">
     
           <HeaderDashBoard/>
    
        <main>
          <div className="mx-auto max-w-7xl mt-auto py-6 sm:px-6 min-h-full lg:px-8">       
          {/* En el Outlet renderiza los componentes */}

          <Outlet />

          </div>
        </main>
      </div>
    </>
  )
}