import React, { useEffect, useState } from 'react';
import './Laboratory.css';
import LabCardAdmin from '../../components/LabCardAdmin';
import {
  getLaboratories,
  deleteLaboratory,
  updatePhysicalResources,
  updateSoftwareResources,
  updateName,
  updateLocation,
  updateCapacity,
  updateAbbreviation
} from '../../services/labService';

const AdminLaboratorios = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [activo, setActivo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLaboratories();
  }, []);

  const loadLaboratories = async () => {
    setLoading(true);
    try {
      const data = await getLaboratories();
      setLaboratorios(data);
      setError(null);
    } catch (err) {
      console.error("Error cargando laboratorios", err);
      setError("Error al cargar los laboratorios");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    setActivo(activo === index ? null : index);
  };

  // Función para formatear fechas correctamente
  const formatDateTime = (timeString) => {
    try {
      // Verificar si el formato es solo hora (HH:MM)
      if (/^\d{2}:\d{2}$/.test(timeString)) {
        // Si es solo hora, devolvemos directamente ese formato
        return { date: 'N/A', time: timeString };
      }

      // Para fechas completas, continuar con el código existente
      const date = new Date(timeString);

      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        return { date: 'Fecha no disponible', time: 'Hora no disponible' };
      }

      // Formatear fecha y hora
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return { date: formattedDate, time: formattedTime };
    } catch (error) {
      return { date: 'Fecha no disponible', time: 'Hora no disponible' };
    }
  };

  // Función para obtener el día de la semana en español
  const getDayOfWeek = (dayString) => {
    const days = {
      'MONDAY': 'Lunes',
      'TUESDAY': 'Martes',
      'WEDNESDAY': 'Miércoles',
      'THURSDAY': 'Jueves',
      'FRIDAY': 'Viernes',
      'SATURDAY': 'Sábado',
      'SUNDAY': 'Domingo'
    };

    return days[dayString] || dayString;
  };

  // Utilidades para pasar a los componentes
  const utils = { formatDateTime, getDayOfWeek };

  // Manejar actualizaciones de laboratorio
  const handleUpdateLab = async (updatedLab) => {
    try {
      const originalLab = laboratorios.find(lab => lab.abbreviation === updatedLab.abbreviation);

      // Verificar cambios y actualizar
      if (originalLab.name !== updatedLab.name) {
        await updateName(updatedLab.abbreviation, updatedLab.name);
      }

      if (originalLab.location !== updatedLab.location) {
        await updateLocation(updatedLab.abbreviation, updatedLab.location);
      }

      if (originalLab.totalCapacity !== updatedLab.totalCapacity) {
        await updateCapacity(updatedLab.abbreviation, updatedLab.totalCapacity);
      }

      // Actualizar recursos físicos si han cambiado
      if (JSON.stringify(originalLab.physicalResource) !== JSON.stringify(updatedLab.physicalResource)) {
        await updatePhysicalResources(updatedLab.abbreviation, updatedLab.physicalResource);
      }

      // Actualizar recursos de software si han cambiado
      if (JSON.stringify(originalLab.softwareResource) !== JSON.stringify(updatedLab.softwareResource)) {
        await updateSoftwareResources(updatedLab.abbreviation, updatedLab.softwareResource);
      }

      // Recargar laboratorios
      await loadLaboratories();

    } catch (error) {
      console.error("Error actualizando laboratorio", error);
      alert("Error al actualizar el laboratorio");
    }
  };

  // Manejar eliminación de laboratorio
  const handleDeleteLab = async (abbreviation) => {
    try {
      await deleteLaboratory(abbreviation);
      // Cerrar el panel activo si se eliminó ese laboratorio
      if (activo !== null && laboratorios[activo].abbreviation === abbreviation) {
        setActivo(null);
      }
      // Recargar la lista
      await loadLaboratories();
    } catch (error) {
      console.error("Error al eliminar laboratorio", error);
      alert("Error al eliminar el laboratorio");
    }
  };

  const handleCreateLab = () => {
    window.location.href = '/admin/laboratorios/nuevo';
  };

  if (loading) return <div className="loading">Cargando laboratorios...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container-labs">
      <div className="header-section">
        <h1 className="main-title">Administración de Laboratorios</h1>
        <button
          className="toggle-button"
          onClick={handleCreateLab}
        >
          Crear Laboratorio
        </button>
      </div>

      <div className="laboratory-grid">
        {laboratorios.map((lab, idx) => {
          const intensity = idx % 4;

          return (
            <LabCardAdmin
              key={idx}
              lab={lab}
              index={idx}
              intensity={intensity}
              isActive={activo === idx}
              onToggle={toggleExpand}
              utils={utils}
              onUpdate={handleUpdateLab}
              onDelete={handleDeleteLab}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminLaboratorios;