const validateRegistration = (name, lastName, email, password) => {
	let errors = {};

	if (!name) {
		errors.name = "El nombre es requerido";
	} else if (name.length < 3) {
		errors.name = "El nombre debe tener al menos 3 caracteres";
	} else if (name.length > 20) {
		errors.name = "El nombre debe tener menos de 20 caracteres";
	} else if (!/^[a-zA-Z ]*$/.test(name)) {
		errors.name = "El nombre debe contener solo letras";
	}

	if (!lastName) {
		errors.lastName = "El apellido es requerido";
	} else if (lastName.length < 3) {
		errors.lastName = "El apellido debe tener al menos 3 caracteres";
	} else if (lastName.length > 20) {
		errors.lastName = "El apellido debe tener menos de 20 caracteres";
	} else if (!/^[a-zA-Z ]*$/.test(lastName)) {
		errors.lastName = "El apellido debe contener solo letras";
	}

	if (!email) {
		errors.email = "El email es requerido";
	} else if (!/\S+@\S+\.\S+/.test(email)) {
		errors.email = "El email es inválido";
	} else if (email.length > 50) {
		errors.email = "El email debe tener menos de 50 caracteres";
	} else if (email.length < 6) {
		errors.email = "El email debe tener al menos 6 caracteres";
	}

	if (!password) {
		errors.password = "La contraseña es requerida";
	} else if (password.length < 6) {
		errors.password = "La contraseña debe tener al menos 6 caracteres";
	} else if (password.length > 20) {
		errors.password = "La contraseña debe tener menos de 20 caracteres";
	} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
		errors.password =
			"La contraseña debe contener al menos una letra mayúscula, una minúscula y un número";
	}

	return errors;
};

export default validateRegistration;
