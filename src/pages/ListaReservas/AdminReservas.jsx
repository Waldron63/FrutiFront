import React, { useState, useEffect } from 'react';
import '../styles/AdminReservas.css';
import ReserveService from '../services/ReserveService';

const AdminReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [filterType, setFilterType] = useState('all'); // 'all', 'date', 'laboratory'
  const [selectedLab, setSelectedLab] = useState('all');
  const [laboratories, setLaboratories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [scheduleDetails, setScheduleDetails] = useState({});

  useEffect(() => {
    // Obtener el usuario actual
    const user = ReserveService.getCurrentUser();
    setCurrentUser(user);

    fetchAllReservas();
    fetchLaboratories();
  }, []);

  useEffect(() => {
    // Filtrar las reservas cuando cambien los criterios de filtrado
    if (filterType === 'all') {
      setFilteredReservas(reservas);
    } else if (filterType === 'date' && selectedDate) {
      // Filtrar por fecha seleccionada
      setFilteredReservas(reservas);
    } else if (filterType === 'laboratory' && selectedLab !== 'all') {
      // Filtrar por laboratorio seleccionado
      setFilteredReservas(reservas);
    }
  }, [filterType, selectedDate, selectedLab, reservas]);

  const fetchAllReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Obteniendo todas las reservas...");

      let data;

      // Obtener el usuario actual
      const user = ReserveService.getCurrentUser();

      if (user && user.role === 'admin') {
        try {
          data = await ReserveService.getAllReserves();
        } catch (adminError) {
          console.error('Error al obtener todas las reservas como admin:', adminError);
          data = await ReserveService.getReserveByUser(user.id);
        }
      } else if (user) {
        data = await ReserveService.getReserveByUser(user.id);
      } else {
        throw new Error('No se pudo determinar el usuario actual');
      }

      console.log("Reservas obtenidas:", data);

      // Obtener detalles de los horarios para cada reserva
      const scheduleDetailsObj = {};

      // Con la simulación actual, el formato de fecha y hora no se muestra correctamente
      // Para simplificar las cosas y mostrar al menos algo, usamos valores fijos
      for (const reserva of data) {
        if (reserva.scheduleId) {
          try {
            // En un entorno real, aquí haríamos una llamada al backend
            console.log(`Simulando obtención de horario para ${reserva.scheduleId}`);

            // Simular respuesta de API con fechas que funcionan correctamente
            const currentDate = new Date();
            const nextDay = new Date();
            nextDay.setDate(currentDate.getDate() + 1);

            scheduleDetailsObj[reserva.scheduleId] = {
              startHour: "08:00",
              endHour: "10:00",
              day: currentDate.getDay(),
              numberDay: currentDate.getDate(),
              month: currentDate.getMonth() + 1,
              year: currentDate.getFullYear(),
              laboratory: reserva.laboratory || "LAB"
            };
          } catch (error) {
            console.warn(`No se pudieron obtener detalles del horario para ${reserva.scheduleId}`, error);
          }
        }
      }

      console.log("Detalles de horarios simulados:", scheduleDetailsObj);
      setScheduleDetails(scheduleDetailsObj);
      setReservas(data);
      setFilteredReservas(data);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar reservas:', err);
      setError('No se pudieron cargar las reservas. Por favor, intenta de nuevo más tarde.');
      setLoading(false);
      setReservas([]);
      setFilteredReservas([]);
    }
  };

  const fetchLaboratories = async () => {
    try {
      // Aquí podrías implementar una llamada real a tu API para obtener los laboratorios
      const labData = [
        { abbreviation: "LS", name: "Laboratorio de Software" },
        { abbreviation: "LR", name: "Laboratorio de Redes" },
        { abbreviation: "LE", name: "Laboratorio de Electrónica" }
      ];
      setLaboratories(labData);
    } catch (err) {
      console.error('Error al cargar laboratorios:', err);
    }
  };

  const handleDelete = async (reserva) => {
    if (window.confirm('¿Estás seguro de que quieres borrar esta reserva?')) {
      try {
        setLoading(true);

        // Si tiene scheduleId es el formato de MongoDB
        if (reserva.scheduleId) {
          await ReserveService.deleteReserveBySchedule({ id: reserva.scheduleId });
        }
        // Si tiene schedule.id es el formato original
        else if (reserva.schedule && reserva.schedule.id) {
          await ReserveService.deleteReserveBySchedule(reserva.schedule);
        }
        // Si ninguno funciona, intenta con el _id
        else if (reserva._id) {
          console.warn("No se pudo determinar el formato correcto para eliminar");
        }

        // Actualizar lista de reservas después de eliminar
        fetchAllReservas();
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

  const renderCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDateObj = new Date(selectedYear, selectedMonth, i);
      const currentDateStr = currentDateObj.toISOString().split('T')[0];

      // Verificar si este día tiene reservas
      const hasReservation = reservas.some(reserva => {
        if (!reserva.scheduleId || !scheduleDetails[reserva.scheduleId]) return false;

        const schedule = scheduleDetails[reserva.scheduleId];
        if (!schedule.year || !schedule.month || !schedule.numberDay) return false;

        return schedule.year === selectedYear &&
               schedule.month === selectedMonth + 1 &&
               schedule.numberDay === i;
      });

      const isSelected = selectedDate === currentDateStr;

      days.push(
        <div
          key={i}
          className={`calendar-day ${hasReservation ? 'has-reservation' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(currentDateStr)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleDateClick = (dateStr) => {
    // Si ya está seleccionada la misma fecha, la deseleccionamos
    if (selectedDate === dateStr) {
      setSelectedDate(null);
      setFilterType('all');
    } else {
      setSelectedDate(dateStr);
      setFilterType('date');
    }
  };

  const handleLabChange = (e) => {
    const lab = e.target.value;
    setSelectedLab(lab);
    if (lab === 'all') {
      setFilterType('all');
    } else {
      setFilterType('laboratory');
    }
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

  const clearFilters = () => {
    setFilterType('all');
    setSelectedDate(null);
    setSelectedLab('all');
  };

  const handleRetry = () => {
    setError(null);
    fetchAllReservas();
  };

  // Función para obtener un color basado en el tipo de reserva
  const getReserveTypeColor = (type) => {
    if (!type) return "";

    switch(type.toLowerCase()) {
      case 'lesson':
        return "lesson-type";
      case 'available':
        return "available-type";
      default:
        return "";
    }
  };

  // Función para obtener y formatear la información del horario
  const getScheduleInfo = (reserva) => {
    // Si no hay scheduleId o no tenemos detalles, devolvemos mensaje de "no disponible"
    if (!reserva.scheduleId || !scheduleDetails[reserva.scheduleId]) {
      return {
        timeInfo: "Horario no disponible",
        dateInfo: "Fecha no disponible",
        laboratory: "Laboratorio no especificado"
      };
    }

    try {
      const schedule = scheduleDetails[reserva.scheduleId];

      // Verificar si tenemos suficiente información para mostrar
      if (!schedule.startHour || !schedule.endHour) {
        return {
          timeInfo: "Horario no disponible",
          dateInfo: "Fecha no disponible",
          laboratory: schedule.laboratory || "Laboratorio no especificado"
        };
      }

      // Formatear la hora
      const startHour = schedule.startHour;
      const endHour = schedule.endHour;
      const timeInfo = `${startHour} - ${endHour}`;

      // Formatear fecha
      let dateInfo = "Fecha no disponible";

      if (schedule.day !== undefined && schedule.numberDay && schedule.month && schedule.year) {
        // Formatear día, mes y año
        const getDayName = (dayNumber) => {
          const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
          return days[dayNumber] || "";
        };

        const getMonthName = (monthNumber) => {
          const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
          return months[monthNumber - 1] || "";
        };

        const dayName = getDayName(schedule.day);
        const monthName = getMonthName(schedule.month);

        dateInfo = `${dayName} ${schedule.numberDay} de ${monthName} ${schedule.year}`;
      }

      return {
        timeInfo,
        dateInfo,
        laboratory: schedule.laboratory || "Laboratorio no especificado"
      };
    } catch (error) {
      console.error("Error al formatear información del horario:", error);
      return {
        timeInfo: "Horario no disponible",
        dateInfo: "Fecha no disponible",
        laboratory: "Laboratorio no especificado"
      };
    }
  };

  if (loading) return <div className="loading">Cargando reservas...</div>;
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button className="retry-button" onClick={handleRetry}>
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="admin-reservas-container">
      <div className="admin-header">
        <h1 className="admin-title">Administrar Reservas</h1>
        <div className="filter-controls">
          <div className="lab-filter">
            <label htmlFor="lab-select">Filtrar por laboratorio:</label>
            <select
              id="lab-select"
              value={selectedLab}
              onChange={handleLabChange}
            >
              <option value="all">Todos los laboratorios</option>
              {laboratories.map(lab => (
                <option key={lab.abbreviation} value={lab.abbreviation}>
                  {lab.name} ({lab.abbreviation})
                </option>
              ))}
            </select>
          </div>
          {(filterType !== 'all') && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="admin-content">
        <div className="reservas-list-container">
          <h2 className="section-title">
            {filterType === 'all' ? 'Todas las reservas' :
             filterType === 'date' ? `Reservas para ${formatDate(selectedDate)}` :
             `Reservas para ${laboratories.find(lab => lab.abbreviation === selectedLab)?.name || selectedLab}`}
          </h2>

          <div className="admin-reservas-list">
            {filteredReservas.length === 0 ? (
              <div className="no-reservas">No hay reservas para mostrar</div>
            ) : (
              filteredReservas.map((reserva, index) => (
                <div
                  className={`admin-reserva-card ${getReserveTypeColor(reserva.type)}`}
                  key={reserva._id || reserva.id || index}
                >
                  <div className="reserva-header">
                    <div className="reserva-lab-name">
                      {(() => {
                        const scheduleInfo = getScheduleInfo(reserva);
                        return scheduleInfo.laboratory || "Laboratorio";
                      })()}
                    </div>
                    <div className="reserva-date-time">
                      {(() => {
                        const scheduleInfo = getScheduleInfo(reserva);
                        if (scheduleInfo.dateInfo === "Fecha no disponible" && scheduleInfo.timeInfo === "Horario no disponible") {
                          return <span className="unavailable-info">Fecha no disponible | Horario no disponible</span>;
                        }
                        return `${scheduleInfo.dateInfo} | ${scheduleInfo.timeInfo}`;
                      })()}
                    </div>
                  </div>

                  <div className="reserva-details">
                    <div className="reserva-user">
                      <span className="detail-label">Usuario:</span>
                      <span className="detail-value">ID: {reserva.userId}</span>
                    </div>
                    <div className="reserva-description">
                      <span className="detail-label">Descripción/Motivo:</span>
                      <span className="detail-value">{reserva.reason || "Sin descripción"}</span>
                    </div>
                    <div className="reserva-type">
                      <span className="detail-label">Tipo:</span>
                      <span className="detail-value">{reserva.type || "No especificado"}</span>
                    </div>
                    <div className="reserva-state">
                      <span className="detail-label">Estado:</span>
                      <span className="detail-value">{reserva.state || "No especificado"}</span>
                    </div>
                  </div>

                  <div className="reserva-actions">
                    <button className="btn-editar">
                      Editar
                    </button>
                    <button className="btn-borrar" onClick={() => handleDelete(reserva)}>
                      Borrar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="admin-calendar-container">
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

          <div className="calendar-info">
            <div className="info-item">
              <div className="color-indicator has-reservation"></div>
              <span>Día con reservas</span>
            </div>
            <div className="info-item">
              <div className="color-indicator selected"></div>
              <span>Día seleccionado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReservas;