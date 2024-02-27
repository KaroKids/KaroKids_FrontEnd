import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const URL_USERS = import.meta.env.VITE_URL_BASE_SERVER;

function UsersView() {
  const [users, setUsers] = useState([]);
 
  const toggleUserStatus = async (usuario_id) => {
    console.log(usuario_id);
    try {
      // Enviar una solicitud DELETE al servidor con el usuarioId en la URL
     // await axios.delete(`${URL_USERS}/usuarios/${usuarioId}`);
     const body = {
        usuario_id:  usuario_id.toString()
     }
     console.log('body',body)

     //const bodyJSON = JSON.stringify(body);
     await axios.delete(`https://karokids.onrender.com/usuarios/`,body);

      
      // Actualizar la lista de usuarios después de la eliminación
      setUsers(users.map(usuario => {
        if (usuario.usuario_id === usuarioId) {
          // Invertir el estado de inactivo del usuario
          return { ...usuario, inactivo: !usuario.inactivo };
        }
        return usuario;
      }));
      
      // Mostrar notificación de éxito
      Toast.fire({
        icon: 'success',
        title: `Usuario ${usuarioId} activado/desactivado exitosamente.`
      });
    } catch (error) {
      console.log('Error al activar/desactivar usuario:', error);
      // Mostrar notificación de error
      Toast.fire({
        icon: 'error',
        title: `Error al activar/desactivar usuario. Por favor, inténtalo de nuevo.`
      });
    }
  };
  
  



   
   // Función para cargar la lista de usuarios al montar el componente
   useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`${URL_USERS}/usuarios`);
        // Verificar si response.data es un array antes de asignarlo a users

        console.log('usuarios:',response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.log('La respuesta no es un array:', response.data);
        }
      } catch (error) {
        console.log('Error al cargar la lista de usuarios:', error);
      }
    };
  
    fetchUsuarios();
  }, []);



const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: "my-toast",
    },
  });

  const handleLogicDelete = (usuarioId, inactivo) => {
    // Mostrar confirmación antes de activar/desactivar usuario
    Swal.fire({
      title: inactivo ? "Activar Usuario" : "Desactivar Usuario",
      text: inactivo ? "¿Estás seguro de activar este usuario?" : "¿Estás seguro de desactivar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: inactivo ? "#3085d6" : "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: inactivo ? "Activar" : "Desactivar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la función para activar/desactivar usuario
        toggleUserStatus(usuarioId);
      }
    });
  };
  return (
    <div className="bg-white mt-20 sm:mt-0">
     {Array.isArray(users) && users.length > 0 && (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-36 lg:py-28 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
          
          <div className="overflow-x-auto">
            <div className="table w-full border-collapse">
              <div className="table-header-group bg-gray-50">
                <div className="table-row">
                  <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">Nombre</div>
                  <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">Email</div>
                  <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">Rol</div>
                  <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">Estado</div>
                  <div className="table-cell text-left px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">Acciones</div>
                </div>
              </div>
              <div className="table-row-group">
                {users?.map((usuario) => (
                  <div key={usuario.usuario_id} className="table-row border-gray-900">
                    <div className="table-cell px-6 py-4 whitespace-nowrap">{usuario.nombre_usuario +' '+ usuario.apellido_usuario}</div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap">{usuario.email_usuario}</div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap">{usuario.roles}</div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap"> {usuario.inactivo ? (
                        <button onClick={() => handleLogicDelete(usuario.usuario_id, true)} className='text-white w-22 h-6 pl-2 pr-2 ring-1 rounded bg-blue-500 hover:bg-white hover:text-blue-500 hover:cursor-pointer'>
                          Activar
                        </button>
                      ) : (
                        <button onClick={() => handleLogicDelete(usuario.usuario_id, false)} className='text-white w-22 h-6 pl-2 pr-2 ring-1 rounded bg-red-500 hover:bg-white hover:text-red-500 hover:cursor-pointer'>
                          Desactivar
                        </button>
                      )}</div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap">
                      {/* Agrega aquí los botones de acciones, por ejemplo: */}
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                            </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default UsersView;
