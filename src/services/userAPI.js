import axios from "axios";
import { api } from "./api";
import { showSuccessPopup, showErrorPopup } from '../utils/popUps';

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${api}/api/user/signin`, userData);
    showSuccessPopup("Creacion de usuaario satisfactoria","Se creo el usuario correctamente");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error crear usuario: "+errorMessage, error);
    showErrorPopup("Error al crear el usuario");
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${api}/api/user/delete/${id}`);
    showSuccessPopup("Eliminar usuario satisfactoriamente","Se elimino el usuario correctamente");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error eliminar usuario: " + errorMessage, error);
    showErrorPopup("Error al eliminar el usuario");
  }
};

export const updatePassword = async (id, password) => {
  try {
    await axios.put(`${api}/api/user/password/${password}`, { id }, {
      headers: { "Content-Type": "application/json" },
    });
    showSuccessPopup("Actualizacion exitosa","Se actualizo la contraseña correctamente");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error actualizar contraseña: " + errorMessage, error);
    showErrorPopup("Error al actualizar contraseña");
  }
};

export const updateEmail = async (id, email) => {
  try {
    await axios.put(`${api}/api/user/mail/${email}`, { id }, {
      headers: { "Content-Type": "application/json" },
    });
    showSuccessPopup("Actualizacion exitosa","Actualizacion correo exitosa");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error actualizar correo: " + errorMessage, error);
    showErrorPopup("Error al actualizar el horario");
  }
};

export const updateUserName = async (id, name) => {
  try {
    await axios.put(`${api}/api/user/name/${name}`, { id }, {
      headers: { "Content-Type": "application/json" },
    });
    showSuccessPopup("Actualizacion exitosa","Actualiacion nombre correctamente");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error actualizar nombre: " + errorMessage, error);
    showErrorPopup("Error al actualizar el nombre");
  }
};

export const updateRole = async (id, role) => {
  try {
    await axios.put(`${api}/api/user/rol/${role}`, { id }, {
      headers: { "Content-Type": "application/json" },
    });
    showSuccessPopup("Actualizacion exitosa","Actualizacion de rol satisfactoria");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error actualizar rol: " + errorMessage, error);
    showErrorPopup("Error al actualizar el rol");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${api}/api/user/all`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error obtener usuarios: " + errorMessage, error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${api}/api/user/${email}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error obtener usuario por email:  + errorMessage", error);
    
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${api}/api/user/userinfo/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error obtener usuario por ID: " + errorMessage, error);
  }
};

export default {
  createUser,
  deleteUser,
  updatePassword,
  updateEmail,
  updateUserName,
  updateRole,
  getAllUsers,
  getUserByEmail,
  getUserById,
};
