import React, { useState, useEffect } from 'react';
import '../styles/Reservations.css';
import ReserveService from '../services/ReserveService';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Usuario simulado con ID real de la base de datos
  const currentUser = {
    id: 842, // ID numérico que existe en la base de datos
    name: 'ADMINISTRADOR',
    role: 'admin'
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const data = await ReserveService.getReserveByUser(currentUser.id);
      setReservas(data);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar reservas:', err);
      setError('No se pudieron cargar las reservas. Por favor, intenta de nuevo más tarde.');
      setLoading(false);
    }
  };

  const handleDelete = async (reserva) => {
    if (window.confirm('¿Estás seguro de que quieres borrar esta reserva?')) {
      try {
        setLoading(true);
        await ReserveService.deleteReserveBySchedule(reserva.schedule);
        // Actualizar lista de reservas después de eliminar
        fetchReservas();
      } catch (err) {
        console.error('Error al eliminar reserva:', err);
        setError('No se pudo eliminar la reserva. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('es-ES', options);
      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    } catch (error) {
      return dateString;
    }
  };

  // Función para formatear la hora
  const formatTime = (timeString) => {
    try {
      // Si es una hora con formato HH:MM, la devolvemos formateada con AM/PM
      if (/^\d{1,2}:\d{2}$/.test(timeString)) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
      }
      return timeString;
    } catch (error) {
      return timeString;
    }
  };

  // Renderizado de los días del calendario
  const renderCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(selectedYear, selectedMonth, i);
      // Verificar si este día tiene reservas
      const hasReservation = reservas.some(reserva => {
        try {
          const reservaDate = new Date(reserva.schedule.day);
          return reservaDate.getDate() === i &&
                 reservaDate.getMonth() === selectedMonth &&
                 reservaDate.getFullYear() === selectedYear;
        } catch (e) {
          return false;
        }
      });

      days.push(
        <div
          key={i}
          className={`calendar-day ${hasReservation ? 'has-reservation' : ''}`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  // Navegación del calendario
  const previousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  if (loading) return <div className="loading">Cargando reservas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="reservas-container">
      <h1 className="reservas-title">Reservas</h1>

      <div className="reservas-content">
        <div className="reservas-list">
          {reservas.length === 0 ? (
            <div className="no-reservas">No tienes reservas activas</div>
          ) : (
            reservas.map((reserva, index) => (
              <div className="reserva-card" key={reserva.id || index}>
                <div className="reserva-left">
                  <div className="user-icon-text">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="reserva-middle">
                  <div className="reserva-lab">
                    <strong>POOB</strong>
                  </div>
                  <div>{currentUser.name}</div>
                  <div>{reserva.laboratory?.name || "Laboratorio"}</div>
                  <div className="reserva-date">
                    {formatDate(reserva.schedule?.day)} {formatTime(reserva.schedule?.startHour)}
                  </div>
                </div>
                <div className="reserva-actions">
                  <button className="btn-borrar" onClick={() => handleDelete(reserva)}>
                    Borrar
                  </button>
                  <button className="btn-editar">
                    Editar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="calendar-section">
          <div className="calendar-header">
            <button className="calendar-nav-btn" onClick={previousMonth}>&lt;</button>
            <div className="calendar-title">
              {new Date(selectedYear, selectedMonth).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </div>
            <button className="calendar-nav-btn" onClick={nextMonth}>&gt;</button>
          </div>

          <div className="calendar-weekdays">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mié</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sáb</div>
            <div>Dom</div>
          </div>

          <div className="calendar-grid">
            {/* Ajustamos el primer día de la semana */}
            {(() => {
              const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
              // En JavaScript, 0 es domingo, por lo que ajustamos para que 0 sea lunes
              const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

              // Agregamos celdas vacías para los días antes del primer día del mes
              const emptyCells = [];
              for (let i = 0; i < adjustedFirstDay; i++) {
                emptyCells.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
              }

              return emptyCells;
            })()}
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservas;