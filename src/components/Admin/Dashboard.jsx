import HeaderDashBoard from './HeaderDashBoard';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {


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