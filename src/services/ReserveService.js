// /src/services/ReserveService.js
const API_URL = "https://labreserveecidevelop-cbfjhdbqb3h5end7.canadacentral-01.azurewebsites.net/api/reserve";

/**
 * Servicio para gestionar las reservas de laboratorios
 */

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
    console.log("Intentando obtener reservas para el usuario:", userId);

    const response = await fetch(`${API_URL}/users/${userId}`);
    console.log("Respuesta del servidor:", response);

    if (!response.ok) {
      console.error("Error HTTP:", response.status, response.statusText);
      throw new Error(`Error al cargar las reservas: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos recibidos:", data);
    return data;
  } catch (error) {
    console.error("Error detallado:", error);
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

// Obtener un horario por su ID
export const getScheduleById = async (scheduleId) => {
  try {
    const response = await fetch(`${API_URL}/schedule/${scheduleId}`);
    if (!response.ok) {
      throw new Error("Error al cargar el horario");
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

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  if (userStr) {
    return JSON.parse(userStr);
  }
  // Usuario por defecto para desarrollo
  return {
    id: 842,
    name: 'ADMINISTRADOR',
    role: 'admin'
  };
};

// Función para adaptar los datos de MongoDB al formato esperado por el componente
export const adaptReserveData = (reserva) => {
  // Si ya tiene la estructura esperada, devolverla tal cual
  if (reserva.laboratory && reserva.schedule) {
    return reserva;
  }

  // Crear un objeto con la estructura esperada
  return {
    id: reserva._id || reserva.id || "",
    userId: reserva.userId || 0,
    laboratory: {
      name: "Laboratorio",
      abbreviation: "LAB"
    },
    schedule: {
      id: reserva.scheduleId || "",
      day: new Date().toISOString().split('T')[0],
      startHour: "08:00",
      endHour: "10:00",
      laboratoryReference: "LAB"
    },
    description: reserva.reason || reserva.description || "Sin descripción",
    attendees: reserva.attendees || 0,
    status: reserva.state || reserva.status || "ACTIVE",
    user: {
      name: `Usuario ID: ${reserva.userId || "Desconocido"}`
    }
  };
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
  getScheduleById,
  postReservesRandom,
  getCurrentUser,
  adaptReserveData
};