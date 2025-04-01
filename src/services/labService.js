
// /src/services/labService.js
const API_URL = 'http://localhost:8080/api/laboratories';

// Obtener todos los laboratorios
export const getLaboratories = async () => {
  try {
    const response = await fetch(`${API_URL}/laboratory`);
    if (!response.ok) {
      throw new Error('Error al cargar laboratorios');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Obtener un laboratorio por abreviatura
export const getLaboratoryByAbbreviation = async (abbreviation) => {
  try {
    const response = await fetch(`${API_URL}/abbreviation/${abbreviation}`);
    if (!response.ok) {
      throw new Error('Error al cargar el laboratorio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Crear un nuevo laboratorio
export const createLaboratory = async (labData) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(labData),
    });
    if (!response.ok) {
      throw new Error('Error al crear el laboratorio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Actualizar capacidad total
export const updateCapacity = async (abbreviation, totalCapacity) => {
  try {
    const response = await fetch(`${API_URL}/totalCapacity/${abbreviation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalCapacity }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la capacidad');
    }
    return true;
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Actualizar abreviatura
export const updateAbbreviation = async (abbreviation, newAbbreviation) => {
  try {
    const response = await fetch(`${API_URL}/changeAbbreviation/${abbreviation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ abbreviation: newAbbreviation }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la abreviatura');
    }
    return true;
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Actualizar nombre
export const updateName = async (abbreviation, newName) => {
  try {
    const response = await fetch(`${API_URL}/name/${abbreviation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el nombre');
    }
    return true;
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Actualizar ubicación
export const updateLocation = async (abbreviation, newLocation) => {
  try {
    const response = await fetch(`${API_URL}/location/${abbreviation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location: newLocation }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la ubicación');
    }
    return true;
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Actualizar recursos físicos
export const updatePhysicalResources = async (abbreviation, physicalResources) => {
  try {
    const response = await fetch(`${API_URL}/physicalResources/${abbreviation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(physicalResources),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar recursos físicos');
    }
    return true;
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Actualizar recursos de software
export const updateSoftwareResources = async (abbreviation, softwareResources) => {
  try {
    const response = await fetch(`${API_URL}/softwareResources/${abbreviation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(softwareResources),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar recursos de software');
    }
    return true;
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Actualizar horario
export const updateSchedule = async (abbreviation, scheduleData) => {
  try {
    const response = await fetch(`${API_URL}/scheduleReference/${abbreviation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar horario');
    }
    return true;
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Eliminar un laboratorio
export const deleteLaboratory = async (abbreviation) => {
  try {
    const response = await fetch(`${API_URL}/${abbreviation}/byelaboratory`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el laboratorio');
    }
    return true;
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Eliminar un horario (esta función habría que implementarla en el backend)
export const deleteSchedule = async (abbreviation, scheduleId) => {
  try {
    // Como no veo un endpoint específico para eliminar horarios,
    // podríamos necesitar crear uno o adaptar este método
    // Por ahora, vamos a simular que existe un endpoint
    const response = await fetch(`${API_URL}/${abbreviation}/scheduleReference/${scheduleId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el horario');
    }
    return true;
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// Para ver la disponibilidad de un laboratorio
export const checkAvailability = async (abbreviation, schedule) => {
  try {
    const response = await fetch(`${API_URL}/${abbreviation}/availability`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schedule),
    });
    if (!response.ok) {
      throw new Error('Error al verificar disponibilidad');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en el servicio de laboratorios:', error);
    throw error;
  }
};

// También exportamos todo como objeto por defecto
export default {
  getLaboratories,
  getLaboratoryByAbbreviation,
  createLaboratory,
  updateCapacity,
  updateAbbreviation,
  updateName,
  updateLocation,
  updatePhysicalResources,
  updateSoftwareResources,
  updateSchedule,
  deleteLaboratory,
  deleteSchedule,
  checkAvailability
};