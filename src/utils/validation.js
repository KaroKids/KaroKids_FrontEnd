const validation = (inputs) => {
  const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
  const urlRegExp =
    /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;
  let errors = {};
  if (!inputs.nombre) {
    errors.nombre = "Nombre es requerido";
    return errors;
  }

  if (!inputs.descripcion) {
    errors.descripcion = "Descripcion es requerido";
    return errors;
  }
  // if (!inputs.imagen_principal) {
  //   errors.imagen_principal = "Imagen URL es requerida";
  // } else if (!urlRegExp.test(inputs.imagen_principal)) {
  //   errors.imagen_principal = "Imagen URL invalida";
  //   return errors;
  // }
  // if (!inputs.imagenes_secundarias) {
  //   errors.imagenes_secundarias = "Imagen URL es requerida";
  // } else if (!urlRegExp.test(inputs.imagenes_secundarias)) {
  //   errors.imagenes_secundarias = "Imagen URL invalida";
  //   return errors;
  // }

  if (!inputs.video) {
    errors.video = "Video URL es requerida";
    return errors;
  }
  if (!inputs.precio) {
    errors.precio = "Precio es requerido";
    return errors;
  }
  if (!inputs.edad) {
    errors.edad = "Edad es requerido";
    return errors;
  }
  if (!inputs.genero) {
    errors.genero = "Género es requerido";
    return errors;
  }
  if (!inputs.stock) {
    errors.stock = "Stock, talla y cantidad es requerido";
    return errors;
  }

  // if (!inputs.color) {
  //   errors.color = "Color es requerido";
  // }

  // if (!inputs.cantidad) {
  //   errors.cantidad = "Cantidad es requerido";
  // }

  return errors;
};

export default validation;
