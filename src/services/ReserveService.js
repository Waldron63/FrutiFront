import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://labreserveeci-hcfwbkh6czhhggba.eastus2-01.azurewebsites.net/api/reserve';

// Define el servicio como un objeto con métodos
const ReserveService = {
  createReserve: async (reserveRequest) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/`, reserveRequest);
      return response.data;
    } catch (error) {
      console.error('Error creating reserve:', error);
      throw error.response?.data || { message: 'Error al conectar con el servidor' };
    }
  },

  getAllReserves: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reserves`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reserves:', error);
      throw error.response?.data || { message: 'Error al obtener reservas' };
    }
  },

  getReservesByLaboratory: async (labAbbreviation) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lab/${labAbbreviation}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lab reserves:', error);
      throw error.response?.data || { message: 'Error al obtener reservas del laboratorio' };
    }
  },

  getReservesByUser: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user reserves:', error);
      throw error.response?.data || { message: 'Error al obtener reservas del usuario' };
    }
  },

  getReserveById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reserve:', error);
      throw error.response?.data || { message: 'Error al obtener reserva' };
    }
  },

  deleteReservesByUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user reserves:', error);
      throw error.response?.data || { message: 'Error al eliminar reservas del usuario' };
    }
  },



  generateRandomReserves: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/random`);
      return response.data;
    } catch (error) {
      console.error('Error generating random reserves:', error);
      throw error.response?.data || { message: 'Error al generar reservas aleatorias' };
    }
  }
};

export default ReserveService;