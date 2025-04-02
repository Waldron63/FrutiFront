import React, { useState, useEffect } from 'react';
import ReserveService from '../../services/ReserveService';
import './Reservations.css';
const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const data = await ReserveService.getAllReserves();
      console.log('Todas las reservas:', data);
      setReservas(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReserva = async (reservaId) => {
    if (window.confirm('¿Está seguro que desea eliminar esta reserva?')) {
      try {
        await ReserveService.deleteReserveById(reservaId);
        fetchReservas(); // Recargar después de eliminar
      } catch (err) {
        setError(err.message || 'Error al eliminar la reserva');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const getUserInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Opcional: calendario decorativo
  const renderCalendar = () => {
    return (
      <div className="calendar-section">
        <div className="calendar-header">
          <div className="calendar-title">Calendario decorativo</div>
        </div>
        <div className="calendar-weekdays">
          <div>D</div><div>L</div><div>M</div><div>X</div><div>J</div><div>V</div><div>S</div>
        </div>
        <div className="calendar-grid">
          {/* Aquí podrías poner días vacíos si quieres */}
        </div>
      </div>
    );
  };

  return (
    <div className="reservas-container">
      <h1 className="reservas-title">Todas las Reservas</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="reservas-content">
        <div className="reservas-list">
          {loading ? (
            <div className="loading">Cargando reservas...</div>
          ) : reservas.length > 0 ? (
            reservas.map(reserva => (
              <div key={reserva.id} className="reserva-card">
                <div className="reserva-left">
                  <div className="user-icon-text">{getUserInitials(reserva.userName)}</div>
                </div>
                <div className="reserva-middle">
                  <div className="reserva-lab">
                    <strong>{reserva.laboratoryName}</strong> - {reserva.laboratoryAbbreviation}
                  </div>
                  <div className="reserva-date">{formatDate(reserva.date)}</div>
                </div>
                <div className="reserva-actions">
                  <button className="btn-editar">Editar</button>
                  <button
                    className="btn-borrar"
                    onClick={() => handleDeleteReserva(reserva.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-reservas">
              No hay reservas para mostrar.
            </div>
          )}
        </div>

        {renderCalendar()}
      </div>
    </div>
  );
};

export default Reservas;
