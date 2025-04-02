import axios from "axios";
import { api } from "./api";
import { showSuccessPopup, showErrorPopup } from '../utils/popUps';

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${api}/api/user/signin`, userData);
    showSuccessPopup("Creación de usuario satisfactoria", "Se creó el usuario correctamente");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al crear usuario: " + errorMessage, error);
    showErrorPopup("Error al crear el usuario");
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${api}/api/user/delete/${id}`);
    showSuccessPopup("Eliminación de usuario satisfactoria", "Se eliminó el usuario correctamente");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al eliminar usuario: " + errorMessage, error);
    showErrorPopup("Error al eliminar el usuario");
  }
};

// 🔹 CORRECCIÓN: Enviar el `id` como un número en el body, no como un objeto `{ id }`
export const updatePassword = async (id, password) => {
  try {
    await axios.put(`${api}/api/user/password/${password}`, id, {
      headers: { "Content-Type": "application/json" },
    });
    showSuccessPopup("Actualización exitosa", "Se actualizó la contraseña correctamente");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al actualizar contraseña: " + errorMessage, error);
    showErrorPopup("Error al actualizar la contraseña");
  }
};

// 🔹 CORRECCIÓN: `id` debe enviarse como un número y no dentro de `{ id }`
export const updateEmail = async (id, email) => {
  try {
    await axios.put(`${api}/api/user/mail/${email}`, id, {
      headers: { "Content-Type": "application/json" },
    });
    showSuccessPopup("Actualización exitosa", "Correo actualizado correctamente");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al actualizar correo: " + errorMessage, error);
    showErrorPopup("Error al actualizar el correo");
  }
};

// 🔹 CORRECCIÓN: `id` debe enviarse como un número en el body
export const updateUserName = async (id, name) => {
  try {
    await axios.put(`${api}/api/user/name/${name}`, id, {
      headers: { "Content-Type": "application/json" },
    });
    showSuccessPopup("Actualización exitosa", "Nombre actualizado correctamente");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al actualizar nombre: " + errorMessage, error);
    showErrorPopup("Error al actualizar el nombre");
  }
};

// 🔹 CORRECCIÓN: `id` debe enviarse correctamente
export const updateRole = async (id, role) => {
  try {
    await axios.put(`${api}/api/user/rol/${role}`, id, {
      headers: { "Content-Type": "application/json" },
    });
    showSuccessPopup("Actualización exitosa", "Rol actualizado correctamente");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al actualizar rol: " + errorMessage, error);
    showErrorPopup("Error al actualizar el rol");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${api}/api/user/all`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al obtener usuarios: " + errorMessage, error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${api}/api/user/emails/${email}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al obtener usuario por email: " + errorMessage, error);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${api}/api/user/userinfo/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al obtener usuario por ID: " + errorMessage, error);
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