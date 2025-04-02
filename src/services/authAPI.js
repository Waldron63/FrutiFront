import axios from 'axios';
import { api } from './api';
import { showSuccessPopup, showErrorPopup } from '../utils/popUps';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${api}/api/auth/register`, userData);
    showSuccessPopup("Registro Exitoso","Se ha registrado el usuario correctamente");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error en registro de usuario: " + errorMessage, error);
    showErrorPopup("Error en registro de usuario:");
    throw error;
  }
};

export const loginUser = async (authRequest) => {
  try {
    authRequest = {
      "email" : "A@B.com",
      "password" : "AB"
  };
    const response = await axios.post(`${api}/api/auth/login`, authRequest);
    showSuccessPopup("Login exitoso", "Se ingreso Correctamente");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error en login de usuario: " + errorMessage, error);
    showErrorPopup("Error en la validacion del usuario: ");
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
};