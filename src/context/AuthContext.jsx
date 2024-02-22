import { auth } from "../firebase/firebase.config.js";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
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
  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const responseGoogle = new GoogleAuthProvider();
      return await signInWithPopup(auth, responseGoogle);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const responseOut = signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <authContext.Provider value={{ register, login, loginWithGoogle, logout }}>
      {children}
    </authContext.Provider>
  );
}
