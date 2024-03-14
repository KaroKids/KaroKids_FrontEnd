import Header from "../Header/Header";

 

function NotFound() {
  return (
    <>
      <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mt-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800">404 - Página no encontrada</h1>
        <p className="mt-4 text-lg text-gray-600">Lo sentimos, la página que buscas no se encuentra.</p>
      </div>
    </div>
    </>
  );
}

export default NotFound;
