import React, { useState } from 'react';
import {
  FaFlask,
  FaKeyboard,
  FaMapMarkerAlt,
  FaNetworkWired,
  FaDesktop,
  FaTv,
  FaMicrochip,
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import "./CreateLaboratory.css";
import { createLaboratory, updatePhysicalResources, updateSoftwareResources } from '../../services/labService';

const CrearLaboratorio = () => {
  const [lab, setLab] = useState({
    name: "",
    abbreviation: "",
    totalCapacity: 0,
    location: ""
  });

  const [schedule, setSchedule] = useState({
    dayOfWeek: "MONDAY",
    openingTime: "08:00",
    closingTime: "20:00"
  });

  const [schedules, setSchedules] = useState([]);
  const [showResources, setShowResources] = useState(false);

  const [physical, setPhysical] = useState({
    projector: false,
    tv: false,
    totalComputers: 0
  });

  const [software, setSoftware] = useState({
    operativeSystem: "",
    partition: false
  });

  const handleChange = (e) => {
    setLab({ ...lab, [e.target.name]: e.target.value });
  };

  const handleScheduleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const addSchedule = () => {
    if (!schedules.some(s =>
      s.dayOfWeek === schedule.dayOfWeek &&
      s.openingTime === schedule.openingTime &&
      s.closingTime === schedule.closingTime)) {
      setSchedules([...schedules, schedule]);
    }
  };

  const removeSchedule = (index) => {
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1);
    setSchedules(updatedSchedules);
  };

  const handleSubmitLab = async () => {
    try {
      if (!lab.name || !lab.abbreviation || !lab.location) {
        alert("Por favor complete todos los campos obligatorios");
        return;
      }

      if (schedules.length === 0) {
        alert("Por favor agregue al menos un horario");
        return;
      }

      const newLab = { ...lab, scheduleReferences: schedules };
      // Para evitar errores, comentamos la llamada real al servicio
      await createLaboratory(newLab);
      console.log("Enviando datos de laboratorio:", newLab);

      setShowResources(true);
    } catch (error) {
      alert("Error al crear laboratorio: " + error.message);
    }
  };

  const handleSaveResources = async () => {
    try {
      // Para evitar errores, comentamos las llamadas reales a los servicios
      await updatePhysicalResources(lab.abbreviation, physical);
      await updateSoftwareResources(lab.abbreviation, software);

      console.log("Recursos físicos:", physical);
      console.log("Recursos de software:", software);

      alert("Laboratorio y recursos guardados correctamente");
    } catch (error) {
      alert("Error al guardar recursos: " + error.message);
    }
  };

  // Traducción de días de la semana
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

  return (
    <div className="container-labs">
      <div className="header-section">
        <h1 className="main-title">Crear Laboratorio</h1>
        <div className="view-controls">
          <button
            className="toggle-button"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
      </div>

      <div className="lab-form-container">
        <div className="lab-form">
          <div className="form-section">
            <h2 className="section-title intensity-0">
              <FaFlask className="section-icon" /> Información General
            </h2>

            <div className="input-row">
              <div className="input-group">
                <label className="input-label">
                  <FaFlask className="input-icon" /> Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={lab.name}
                  onChange={handleChange}
                  placeholder="Nombre del laboratorio"
                  className="form-input"
                />
              </div>
            </div>

            <div className="input-row three-columns">
              <div className="input-group">
                <label className="input-label">
                  <FaNetworkWired className="input-icon" /> Abreviatura
                </label>
                <input
                  type="text"
                  name="abbreviation"
                  value={lab.abbreviation}
                  onChange={handleChange}
                  placeholder="Abreviatura"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <FaKeyboard className="input-icon" /> Capacidad
                </label>
                <select
                  name="totalCapacity"
                  value={lab.totalCapacity}
                  onChange={handleChange}
                  className="form-select"
                >
                  {[...Array(101).keys()].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <FaMapMarkerAlt className="input-icon" /> Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  value={lab.location}
                  onChange={handleChange}
                  placeholder="Ubicación del laboratorio"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title intensity-0">
              <FaCalendarAlt className="section-icon" /> Horario Disponible
            </h2>

            <div className="schedule-container">
              <div className="schedule-inputs">
                <div className="input-row three-columns">
                  <div className="input-group">
                    <label className="input-label">Día</label>
                    <select
                      name="dayOfWeek"
                      value={schedule.dayOfWeek}
                      onChange={handleScheduleChange}
                      className="form-select"
                    >
                      {['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY'].map(day => (
                        <option key={day} value={day}>{getDayOfWeek(day)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      <FaClock className="input-icon" /> Hora Inicio
                    </label>
                    <input
                      type="time"
                      name="openingTime"
                      value={schedule.openingTime}
                      onChange={handleScheduleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      <FaClock className="input-icon" /> Hora Fin
                    </label>
                    <input
                      type="time"
                      name="closingTime"
                      value={schedule.closingTime}
                      onChange={handleScheduleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <button
                  className="add-schedule-btn"
                  onClick={addSchedule}
                >
                  <FaPlus /> Añadir Horario
                </button>
              </div>

              {schedules.length > 0 ? (
                <div className="schedules-list-container">
                  <div className="schedules-list">
                    {schedules.map((s, idx) => (
                      <div key={idx} className="schedule-item intensity-0">
                        <span className="schedule-day">{getDayOfWeek(s.dayOfWeek)}</span>
                        <span className="schedule-time">
                          {s.openingTime} - {s.closingTime}
                        </span>
                        <button
                          className="delete-schedule"
                          onClick={() => removeSchedule(idx)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-schedules">
                  No hay horarios agregados
                </div>
              )}
            </div>
          </div>

          {!showResources ? (
            <button
              className="save-button primary"
              onClick={handleSubmitLab}
            >
              <FaSave /> Guardar Laboratorio
            </button>
          ) : (
            <>
              <div className="form-section">
                <h2 className="section-title intensity-0">
                  <FaDesktop className="section-icon" /> Recursos Físicos
                </h2>

                <div className="input-row three-columns">
                  <div className="input-group">
                    <label className="input-label">
                      <FaDesktop className="input-icon" /> Proyector
                    </label>
                    <select
                      name="projector"
                      value={physical.projector ? "true" : "false"}
                      onChange={(e) =>
                        setPhysical({ ...physical, projector: e.target.value === "true" })
                      }
                      className="form-select"
                    >
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      <FaTv className="input-icon" /> Televisor
                    </label>
                    <select
                      name="tv"
                      value={physical.tv ? "true" : "false"}
                      onChange={(e) =>
                        setPhysical({ ...physical, tv: e.target.value === "true" })
                      }
                      className="form-select"
                    >
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      <FaKeyboard className="input-icon" /> Total Computadores
                    </label>
                    <select
                      name="totalComputers"
                      value={physical.totalComputers}
                      onChange={(e) =>
                        setPhysical({ ...physical, totalComputers: parseInt(e.target.value) })
                      }
                      className="form-select"
                    >
                      {[...Array(101).keys()].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2 className="section-title intensity-0">
                  <FaMicrochip className="section-icon" /> Recursos de Software
                </h2>

                <div className="input-row two-columns">
                  <div className="input-group">
                    <label className="input-label">
                      Sistemas Operativos
                    </label>
                    <input
                      type="text"
                      value={software.operativeSystem}
                      onChange={(e) =>
                        setSoftware({ ...software, operativeSystem: e.target.value })
                      }
                      placeholder="Sistemas operativos instalados"
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      <FaMicrochip className="input-icon" /> Partición
                    </label>
                    <select
                      value={software.partition}
                      onChange={(e) =>
                        setSoftware({ ...software, partition: e.target.value })
                      }
                      className="form-select"
                    >
                      <option value="Sí">Sí</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                className="save-button primary"
                onClick={handleSaveResources}
              >
                <FaSave /> Guardar y Finalizar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrearLaboratorio;