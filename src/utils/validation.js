const validation = (inputs) => {
  const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
  const urlRegExp =
    /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;
  let errors = {};
  if (!inputs.nombre) {
    errors.nombre = "nombre es requerido";
  }

  if (!inputs.descripcion) {
    errors.descripcion = "descripcion es requerido";
  }
  if (!inputs.imagen_principal) {
    errors.imagen_principal = "Imagen URL es requerida";
  } else if (!urlRegExp.test(inputs.imagen_principal)) {
    errors.imagen_principal = "Imagen URL invalida";
  }
  if (!inputs.imagenes_secundarias) {
    errors.imagenes_secundarias = "Imagen URL es requerida";
  } else if (!urlRegExp.test(inputs.imagenes_secundarias)) {
    errors.imagenes_secundarias = "Imagen URL invalida";
  }

  if (!inputs.video) {
    errors.precio = "video URL es requerida";
  }
  if (!inputs.precio) {
    errors.precio = "precio es requerido";
  }
  if (!inputs.edad) {
    errors.edad = "edad es requerido";
  }
  if (!inputs.genero) {
    errors.genero = "genero es requerido";
  }
  if (!inputs.talle) {
    errors.talle = "talle es requerido";
  }

  if (!inputs.color) {
    errors.color = "color es requerido";
  }

  if (!inputs.cantidad) {
    errors.cantidad = "cantidad es requerido";
  }

  return errors;
};

export default validation;
