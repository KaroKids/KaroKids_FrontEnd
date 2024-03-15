import TopFiveFavorites from './TopFiveFavorites'
import TopFiveClientes from './TopFiveClientes';
import Panel from './Panel';
import TopProductos from './TopProductos';


  export default function Stats() {

  return (
    <div className=" lg:py-[100px] py-sm-24 py-md-32    bg-info-light">
     
        <Panel />
        <TopFiveFavorites />
        <TopProductos />
        <TopFiveClientes/>
        
              
    </div>
      
    )
  }
  