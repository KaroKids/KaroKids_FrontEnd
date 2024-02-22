import { auth } from "../firebase/firebase.config.js";
import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) {
		console.log("error creating auth context");
	}
	return context;
};

export function AuthProvider({ children }) {
	const [user, setUser] = useState("");
	useEffect(() => {
		const suscribed = onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				setUser("");
			} else {
				setUser(currentUser);
			}
		});
		return () => suscribed();
	}, []);

	const register = async (email, password, displayName) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateDisplayName(response.user, displayName);
			alert("Te has registrado correctamente.");
		} catch (error) {
			alert("Ya existe un usuario asociado a este correo");
		}
	};

	const updateDisplayName = async (user, displayName) => {
		try {
			await updateProfile(user, { displayName });
		} catch (error) {
			alert("No se pudo actualizar el display name");
		}
	};

	const login = async (email, password) => {
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			alert("Has ingresado exitosamente.");
		} catch (error) {
			alert("No existe ningun usuario asociado a este correo");
		}
	};

	const loginWithGoogle = async () => {
		try {
			const responseGoogle = new GoogleAuthProvider();
			return await signInWithRedirect(auth, responseGoogle);
			alert("Has ingresado exitosamente.");
		} catch (error) {
			console.log(error);
		}
	};

	const registerWithGoogle = async () => {
		try {
			const responseGoogle = new GoogleAuthProvider();
			return await signInWithRedirect(auth, responseGoogle);
			alert("Te has registrado correctamente.");
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			const response = await signOut(auth);
			alert("Sesion finalizada con éxito");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<authContext.Provider
			value={{
				register,
				login,
				loginWithGoogle,
				registerWithGoogle,
				logout,
				user,
			}}>
			{children}
		</authContext.Provider>
	);
}
