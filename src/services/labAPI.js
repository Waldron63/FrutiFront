import axios from "axios";
import { api } from "./api";
import { showSuccessPopup, showErrorPopup } from '../utils/popUps';

export const createLaboratory = async (laboratoryData) => {
  try {
    const response = await axios.post(`${api}/laboratories/`, laboratoryData);
    showSuccessPopup("Laboratorio Creado Satisfactoriamente", "Creacion de Laboratorio Exitosa");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error crear laboratorio: "+errorMessage, error);
    showErrorPopup("Error al crear el laboratorio");
  }
};

export const getAllLaboratories = async () => {
  try {
    const response = await axios.get(`${api}/laboratories/laboratory`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error obtener laboratorios: "+errorMessage, error);
  }
};

export const getLaboratoryByAbbreviation = async (abbreviation) => {
  try {
    const response = await axios.get(`${api}/laboratories/abbreviation/${abbreviation}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error obtener laboratorio por abreviatura: "+errorMessage, error);
  }
};

export const updateLaboratoryScheduleReference = async (abbreviation, totalCapacity) => {
  try {
    await axios.put(`${api}/laboratories/update/${abbreviation}`, { totalCapacity });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error actualizar laboratorio: "+errorMessage, error);
  }
};

export const deleteLaboratory = async (abbreviation) => {
  try {
    await axios.delete(`${api}/laboratories/${abbreviation}/byelaboratory`);
    showSuccessPopup("Laboratorio Eliminado", "Laboratorio eliminado satisfactoriamente");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error eliminar laboratorio: "+errorMessage, error);
    showErrorPopup("Error al eliminar el laboratorio");
  }
};

export const checkLaboratoryAvailability = async (abbreviation, schedule) => {
  try {
    const response = await axios.get(`${api}/laboratories/${abbreviation}/availability`, {
      data: schedule
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "";
    console.error("Error verificar disponibilidad de laboratorio: "+errorMessage, error);
  }
};

export default {
  createLaboratory,
  getAllLaboratories,
  getLaboratoryByAbbreviation,
  updateLaboratoryScheduleReference,
  deleteLaboratory,
  checkLaboratoryAvailability,
};
