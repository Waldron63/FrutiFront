import axios from "axios";
import { showSuccessPopup, showErrorPopup } from '../utils/popUps';
import { api } from "./api";

export const createReserve = async (reserveData) => {
  try {
    const response = await axios.post(`${api}/api/reserve/`, reserveData);
    showSuccessPopup("Reserva creada satisfactoriamente", "Se creó la reserva con éxito");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al crear reserva: " + errorMessage, error);
    showErrorPopup("Error al crear la reserva");
  }
};

export const deleteReserveBySchedule = async (schedule) => {
  try {
    await axios.delete(`${api}/api/reserve/schedules`, {
      data: schedule,
    });
    showSuccessPopup("Reserva Eliminada satisfactoriamente", "La reserva se eliminó con éxito");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al eliminar reservas por horario: " + errorMessage, error);
    showErrorPopup("Error al eliminar la reserva");
  }
};

export const deleteReserveByUser = async (userId) => {
  try {
    await axios.delete(`${api}/api/reserve/users/${userId}`);
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al eliminar reservas por usuario: " + errorMessage, error);
  }
};

export const getAllReserves = async () => {
  try {
    const response = await axios.get(`${api}/api/reserve/reserves`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.log("Error al obtener reservas: " + errorMessage, error);
    throw error;
  }
};

export const getReserveByLaboratory = async (labAbbreviation) => {
  try {
    const response = await axios.get(`${api}/api/reserve/lab/${labAbbreviation}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al obtener reservas por laboratorio: " + errorMessage, error);
  }
};

export const getReserveByUser = async (userId) => {
  try {
    const response = await axios.get(`${api}/api/reserve/users/${userId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al obtener reservas por usuario: " + errorMessage, error);
  }
};

export const getReserveByDay = async (day) => {
  try {
    const response = await axios.get(`${api}/api/reserve/day/${day}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al obtener reservas por día: " + errorMessage, error);
  }
};

export const getReserveByMonth = async (month) => {
  try {
    const response = await axios.get(`${api}/api/reserve/month/${month}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al obtener reservas por mes: " + errorMessage, error);
  }
};

export const getReserveById = async (id) => {
  try {
    const response = await axios.get(`${api}/api/reserve/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al obtener reserva por ID: " + errorMessage, error);
  }
};

export const getOnlyReserveById = async (id) => {
  try {
    const response = await axios.get(`${api}/api/reserve/reserves/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error al obtener detalles de reserva por ID: " + errorMessage, error);
  }
};

export default {
  createReserve,
  deleteReserveBySchedule,
  deleteReserveByUser,
  getAllReserves,
  getReserveByLaboratory,
  getReserveByUser,
  getReserveByDay,
  getReserveByMonth,
  getReserveById,
  getOnlyReserveById
};