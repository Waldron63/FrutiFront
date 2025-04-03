import React, { useState } from 'react';
import ReserveService  from '../../services/ReserveService';
import './CreateReserve.css';
import Navbar from "../../components/Navbar/Navbar";

const CrearReservas = () => {
  const [formData, setFormData] = useState({
    laboratoryName: '',
    reason: '',
    userId: '',
    day: '',
    month: 'APRIL',
    year: '2025',
    startHour: '8:30 AM',
    type: 'lesson',
    priority: 3
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const hours = [
    '7:00 AM', '8:30 AM', '10:00 AM', '11:30 AM',
    '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Convert time format from "8:30 AM" to LocalTime format
      const timeString = formData.startHour;
      let hour = parseInt(timeString.split(':')[0]);
      const minute = parseInt(timeString.split(':')[1].split(' ')[0]);
      const period = timeString.split(' ')[1];

      if (period === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }

      // Map month string to numeric month (1-based)
      const monthIndex = months.indexOf(formData.month) + 1;

      // Map day of week based on the date
      const date = new Date(formData.year, monthIndex - 1, parseInt(formData.day));
      const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay(); // Convert Sunday from 0 to 7 to match DayOfWeek enum

      const reserveRequest = {
        laboratoryName: formData.laboratoryName,
        reason: formData.reason,
        userId: parseInt(formData.userId),
        numberDay: parseInt(formData.day),
        day: dayOfWeek,
        month: monthIndex,
        year: parseInt(formData.year),
        startHour: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        type: formData.type,
        priority: parseInt(formData.priority)
      };

      const response = await ReserveService.createReserve(reserveRequest);
      console.log('Reserve created successfully:', response);
      setSuccess('Reserva creada exitosamente!');

      // Reset form
      setFormData({
        laboratoryName: '',
        reason: '',
        userId: '',
        day: '',
        month: 'APRIL',
        year: '2025',
        startHour: '8:30 AM',
        type: 'lesson',
        priority: 3
      });
    } catch (error) {
      console.error('Error creating reserve:', error);
      setError(error.message || 'Error al crear la reserva. Por favor intente de nuevo.');
    }
  };

  const handleCancel = () => {
    // Navigate back or reset form
    window.history.back();
  };

  return (
    <div className="create-reservation-container">
      <Navbar />
      <div className="reservation-header">
        <h1>Crear Reserva</h1>
        <button className="back-button" onClick={handleCancel}>
          Volver
        </button>
      </div>

      <div className="reservation-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">
              <i className="fas fa-info-circle"></i> Información General
            </h2>
          </div>

          <div className="form-section">
            <label className="form-label">
              <i className="fas fa-building"></i> Laboratorio
            </label>
            <input
              type="text"
              name="laboratoryName"
              value={formData.laboratoryName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="LABICO"
              required
            />
          </div>

          <div className="form-section">
            <label className="form-label">
              <i className="fas fa-clipboard"></i> Propósito de la Reserva
            </label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="form-input"
              placeholder="popopop"
              required
            />
          </div>

          <div className="form-section">
            <label className="form-label">
              <i className="fas fa-id-card"></i> Número de Identificación
            </label>
            <input
              type="number"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className="form-input"
              placeholder="841"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-column">
              <label className="form-label">
                <i className="fas fa-calendar-day"></i> Día
              </label>
              <input
                type="number"
                name="day"
                min="1"
                max="31"
                value={formData.day}
                onChange={handleInputChange}
                className="form-input"
                placeholder="7"
                required
              />
            </div>

            <div className="form-column">
              <label className="form-label">
                <i className="fas fa-calendar-alt"></i> Mes
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                {months.map(month => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-column">
              <label className="form-label">
                <i className="fas fa-calendar"></i> Año
              </label>
              <input
                type="number"
                name="year"
                min="2025"
                max="2030"
                value={formData.year}
                onChange={handleInputChange}
                className="form-input"
                placeholder="2025"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">
              <i className="fas fa-clock"></i> Hora Inicio
            </label>
            <select
              name="startHour"
              value={formData.startHour}
              onChange={handleInputChange}
              className="form-input dropdown"
              required
            >
              {hours.map(hour => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <label className="form-label">
              <i className="fas fa-star"></i> Prioridad (1-5)
            </label>
            <input
              type="number"
              name="priority"
              min="1"
              max="5"
              value={formData.priority}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-section submit-section">
            <button type="submit" className="submit-button">
              <i className="fas fa-save"></i> Guardar y Finalizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearReservas;