import React, { useState } from "react";
import {
  FaFlask,
  FaKeyboard,
  FaNetworkWired,
  FaClock,
  FaSave,
} from "react-icons/fa";
import "../styles/CreateReserve.css";
import "../styles/CreateLaboratory.css";
import {
  createReserve
} from "../services/ReserveService";

const CrearReservas = () => {
  const [reserveRequest, setReserveRequest] = useState({
    type: "",
    reason: "",
    userId: 0,
    state: "",
    startHour: "",
    numberDay: 7,
    day: "",
    month: "",
    year: 0,
    laboratoryName: "",
  });

  const handleChange = (e) => {
    setReserveRequest({ ...reserveRequest, [e.target.name]: e.target.value });
  };

  const handleSubmitReserve = async () => {
    try {
      if (
        !reserveRequest.laboratoryName ||
        !reserveRequest.reason ||
        !reserveRequest.userId ||
        !reserveRequest.type ||
        !reserveRequest.numberDay ||
        !reserveRequest.month ||
        !reserveRequest.year ||
        !reserveRequest.startHour
      ) {
        alert("Por favor complete todos los campos obligatorios");
        return;
      }

      // Para evitar errores, comentamos la llamada real al servicio
      // await createReserve(reserveRequest);
      console.log("Enviando datos de reserva:", reserveRequest);
    } catch (error) {
      alert("Error al crear laboratorio: " + error.message);
    }
  };

  // Traducción de días de la semana
  const getDayOfWeek = (dayString) => {
    const days = {
      MONDAY: "Lunes",
      TUESDAY: "Martes",
      WEDNESDAY: "Miércoles",
      THURSDAY: "Jueves",
      FRIDAY: "Viernes",
      SATURDAY: "Sábado",
      SUNDAY: "Domingo",
    };

    return days[dayString] || dayString;
  };

  return (
    <div className="container-labs">
      <div className="header-section">
        <h1 className="main-title">Crear Reserva</h1>
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
                  <FaFlask className="input-icon" /> Laboratorio
                </label>
                <input
                  type="text"
                  name="laboratoryName"
                  value={reserveRequest.laboratoryName}
                  onChange={handleChange}
                  placeholder="Nombre del laboratorio"
                  className="form-input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                <FaNetworkWired className="input-icon" /> Proposito de la
                Reserva
              </label>
              <input
                type="text"
                name="reason"
                value={reserveRequest.reason}
                onChange={handleChange}
                placeholder="Razon de la reserva"
                className="form-input"
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <FaKeyboard className="input-icon" /> Numero de Identificacion
              </label>
              <input
                type="text"
                name="userId"
                value={reserveRequest.userId}
                onChange={handleChange}
                placeholder="Id del usuario"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="input-row three-columns">
              <div className="input-group">
                <label className="input-label">
                  <FaNetworkWired className="input-icon" /> Dia
                </label>
                <input
                  type="text"
                  name="day"
                  value={reserveRequest.day}
                  onChange={handleChange}
                  placeholder="Dia"
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <label className="input-label">
                  <FaNetworkWired className="input-icon" /> Mes
                </label>
                <input
                  type="text"
                  name="month"
                  value={reserveRequest.month}
                  onChange={handleChange}
                  placeholder="Mes"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <FaNetworkWired className="input-icon" /> year
                </label>
                <input
                  type="text"
                  name="year"
                  value={reserveRequest.year}
                  onChange={handleChange}
                  placeholder="year"
                  className="form-input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                <FaClock className="input-icon" /> Hora Inicio
              </label>
              <input
                type="time"
                name="openingTime"
                value={reserveRequest.startHour}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
            <>
              <button
                className="save-button primary"
                onClick={handleSubmitReserve}
              >
                <FaSave /> Guardar y Finalizar
              </button>
            </>
        </div>
      </div>
    </div>
  );
};

export default CrearReservas;