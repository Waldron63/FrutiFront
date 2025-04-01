import axios from "axios";
import { api } from "./api";
import { showSuccessPopup, showErrorPopup } from '../utils/popUps';

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${api}/user/signin`, userData);
    return response.data;
  } catch (error) {
    console.log("Error crear usuario: ", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${api}/user/delete/${id}`);
  } catch (error) {
    console.log("Error eliminar usuario: ", error);
    throw error;
  }
};

export const updatePassword = async (id, password) => {
  try {
    await axios.put(`${api}/user/password/${password}`, { id }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error actualizar contraseña: ", error);
    throw error;
  }
};

export const updateEmail = async (id, email) => {
  try {
    await axios.put(`${api}/user/mail/${email}`, { id }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error actualizar correo: ", error);
    throw error;
  }
};

export const updateUserName = async (id, name) => {
  try {
    await axios.put(`${api}/user/name/${name}`, { id }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error actualizar nombre: ", error);
    throw error;
  }
};

export const updateRole = async (id, role) => {
  try {
    await axios.put(`${api}/user/rol/${role}`, { id }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error actualizar rol: ", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${api}/user/all`);
    return response.data;
  } catch (error) {
    console.log("Error obtener usuarios: ", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${api}/user/${email}`);
    return response.data;
  } catch (error) {
    console.log("Error obtener usuario por email: ", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${api}/user/userinfo/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error obtener usuario por ID: ", error);
    throw error;
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
