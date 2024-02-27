import clsx from "clsx";

const validation =   (inputs, newStock) => {
  const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
  const urlRegExp =
    /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;
  let errors = {}

  if (!inputs.nombre) {
    errors.nombre = "Nombre es requerido";
    errors.msgData = "Nombre es requerido"
    return errors;
  }

  if (!inputs.descripcion) {
    errors.descripcion = "Descripcion es requerido";
    errors.msgData ="Descripcion es requerido";
    return errors;
  }
 // console.log('validation imagen principal', inputs.imagen_principal)
  if (!inputs.imagen_principal || inputs.imagen_principal === "") {
    errors.imagen_principal = "Una imagen principal es requerida";
    errors.msgData = "Una imagen principal es requerida";
    return errors;
  }  
  
  if (!inputs.imagenes_secundarias.length ) {
    errors.imagenes_secundarias = "Una imagen secundaria es requerida";
    errors.msgData = "Una imagen secundaria es requerida";
    return errors;
  }  
  // if (!inputs.imagenes_secundarias) {
  //   errors.imagenes_secundarias = "Imagen URL es requerida";
  // } else if (!urlRegExp.test(inputs.imagenes_secundarias)) {
  //   errors.imagenes_secundarias = "Imagen URL invalida";
  //   return errors;
  // }

  // if (!inputs.cantidad) {
  //   errors.cantidad = "Cantidad es requerido";
  //   return errors;
  // }

  if (!inputs.precio) {
    errors.precio = "Precio es requerido";
    errors.msgData ="Precio es requerido";
    return errors;
  }
 
  if (!inputs.edad) {
    errors.edad = "Edad es requerido";
    errors.msgData ="Edad es requerido";
    return errors;
  }
  if (!inputs.genero) {
    errors.genero = "Género es requerido";
    errors.msgData = "Género es requerido";
    return errors;
  }

  // if (!inputs.stock || !inputs.stock.size || !inputs.stock.color || !inputs.stock.cantidad) {
    if (Object.keys(inputs.stock).length === 0) { 
      console.log('newStock,',newStock);
    errors.stock = [
      { talla: "Talla es requerida" },
      { color: "Color es requerido" },
      { cantidad: "Cantidad es requerida" }
    ];
    errors.msgData = !newStock.size ? errors.stock[0].talla 
    : !newStock.color ? errors.stock[1].color 
    : !newStock.cantidad ? errors.stock[2].cantidad : '';

    if(newStock.size && newStock.color && newStock.cantidad){
      if(Object.keys(inputs.stock).length === 0){
        errors.msgData ="Click en 'Agregar' para confirmar Talla, Color y Cantidad."
        
      }
    }
    console.log(errors.msgData)
    return errors;
  }

  
  // if (!inputs.stock || Object.keys(inputs.stock[0].talla).length === 0 
  // || Object.keys(inputs.stock[0].color).length === 0 ||
  // Object.keys(inputs.stock.cantidad[0]).length === 0) {
  //   errors.stock = [{"talla":"Talla es requerido"}, {"color":"Color es requerido"},{"candidad":"Cantidad es requerido"}]
   
  //   errors.msgData = "Talla, color y cantidad es requerido";
  //   return errors;
  // }

  //Valida el objeto newStock
  // if (!stock.size) {
  //   errors.stock = "Talla es requerido";
  //   errors.msgData = "Stock, talla y cantidad es requerido";
  //   return errors;
  // }

  // if (!stock.color) {
  //   errors.color = "Color es requerido";
  //   return errors;
  // }

  // if (!stock.cantidad) {
  //   errors.cantidad = "Cantidad es requerida";
  //   return errors;
  // }
  // if (!inputs.color) {
  //   errors.color = "Color es requerido";
  // }

  // if (!inputs.cantidad) {
  //   errors.cantidad = "Cantidad es requerido";
  // }

  console.log('validatios errors file:',errors);

  return errors;
};

export default validation;
