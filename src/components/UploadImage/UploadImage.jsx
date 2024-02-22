import  {useState} from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid'
 
const UploadImage = () => {
  const [imagenPrincipal, setImagenPrincipal] = useState([]);
  const [imagSecundarias, setImagSecundarias] = useState([]);

  const [loadingImage, setloadingImage] = useState(false);

  const uploadImage = async (e) =>{
    const files = e.target.files;
    const data = new FormData();
    data.append("file",files[0]);
    data.append("upload_preset", "images");
    setloadingImage(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/edsonnaza/image/upload",
      {
        method: "POST",
        body: data,
      }

    )
    const file = await res.json();
    console.log(res)
    setImage(file.secure_url);
    setloadingImage(false);
  }

  const previewImagenPrincipal = (e)=>{
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagenPrincipal([reader.result]); 
      };
      reader.readAsDataURL(selectedImage);
    }
  }

  const previewImagSecundarias = (e)=>{
    
    console.log('Img secundarias');
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagSecundarias([...imagSecundarias,reader.result]);
      };
      reader.readAsDataURL(selectedImage);
    }
  }

    return ( 

        <div>

       
        <div className="col-span-full">
        <label htmlFor="cover-photo" className="block text-sm font-medium mt-5 leading-6 text-gray-900">
         Imagen Principal
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
          {imagenPrincipal && (
     
          
<div className="mt-2 flex flex-wrap justify-center lg:flex-col">
   {imagenPrincipal.map((imageUrl, index) => (
     <img key={index} 
     className="h-96 w-full rounded-lg object-cover object-center"
     src={imageUrl} 
     alt={`Imagen ${index + 1}`}  />
   ))}
 </div>
    
   
 )}
          { !imagenPrincipal.length && <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />}  
            <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className=" relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span className='flex justify-center text-center'>Subir la foto</span>
                <input id="file-upload" onChange={previewImagenPrincipal} name="file-upload" type="file" className="sr-only" />
              </label>
              <p className="pl-1">arrastrar o soltar</p>
            </div>
            <p className="flex flex-col text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 1 MB</p>
          </div>
         
    </div>


    
        </div>

        <div className="col-span-full">
        <label htmlFor="cover-photo" className="block text-sm font-medium mt-5 leading-6 text-gray-900">
         Imagenes Secundarias
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
          {imagSecundarias && (
     
          
     <div className="mt-2 flex flex-wrap justify-center lg:flex-col gap-2">
   {imagSecundarias.map((imageUrl, index) => (
     <img key={index} 
     className="lg:h-25 lg:w-40  rounded-lg object-cover object-center"
     src={imageUrl} 
     alt={`Imagen ${index + 1}`}  />
   ))}
 </div>
    
   
 )}
          { !imagSecundarias.length && <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />}  
            <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload-second"
                className=" relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span className='flex justify-center text-center'>Subir la foto</span>
                <input id="file-upload-second" onChange={previewImagSecundarias} name="file-upload-second" type="file" className="sr-only" />
              </label>
              <p className="pl-1">arrastrar o soltar</p>
            </div>
            <p className="flex flex-col text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 1 MB</p>
          </div>
         
    </div>


    
        </div>
</div>
    
  );
}
 
export default UploadImage;