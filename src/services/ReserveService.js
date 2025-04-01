// /src/services/ReserveService.js
const API_URL = "http://localhost:8080/api/reserve";

// Crear una nueva reserva
export const createReserve = async (reserveRequest) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserveRequest),
    });
    if (!response.ok) {
      throw new Error("Error al crear la reserva");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

// Eliminar una reserva por horario
export const deleteReserveBySchedule = async (schedule) => {
  try {
    const response = await fetch(`${API_URL}/schedules`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schedule),
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la reserva");
    }
    return true;
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

// Eliminar una reserva por usuario
export const deleteReserveByUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el laboratorio");
    }
    return true;
  } catch (error) {
    console.error("Error en el servicio de laboratorios:", error);
    throw error;
  }
};

// Obtener todas las reservas
export const getAllReserves = async () => {
  try {
    const response = await fetch(`${API_URL}/reserves`);
    if (!response.ok) {
      throw new Error("Error al cargar las reservas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

// Obtener todas las reservas de un laboratorio
export const getReserveByLaboratory = async (labAbbreviation) => {
  try {
    const response = await fetch(`${API_URL}/lab/${labAbbreviation}`);
    if (!response.ok) {
      throw new Error("Error al cargar las reservas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

// Obtener las Reservas de un usuario
export const getReserveByUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error("Error al cargar las reservas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

// Obtener las Reservas de un dia
export const getReserveByDay = async (day) => {
  try {
    const response = await fetch(`${API_URL}/day/${day}`);
    if (!response.ok) {
      throw new Error("Error al cargar las reservas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

// Obtener las Reservas de un mes
export const getReserveByMonth = async (month) => {
  try {
    const response = await fetch(`${API_URL}/month/${month}`);
    if (!response.ok) {
      throw new Error("Error al cargar las reservas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

// Obtener una reserva por su id
export const getReserveById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al cargar las reservas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

// Obtener solo la reserva (sin horario) por el id
export const getOnlyReserveById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/reserves/${id}`);
    if (!response.ok) {
      throw new Error("Error al cargar las reservas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

// crear nuevas reservas de forma random
export const postReservesRandom = async () => {
  try {
    const response = await fetch(`${API_URL}/random`, {
      method: "POST"
    });
    if (!response.ok) {
      throw new Error("Error al crear las reservas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de reservas:", error);
    throw error;
  }
};

//exportamos todo como objeto por defecto
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
  getOnlyReserveById,
  postReservesRandom,
};