import React, { useState, useEffect } from 'react';
import './Reservations.css';
import './AdminReservas.css';
import ReserveService from '../../services/ReserveService';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [selectedLab, setSelectedLab] = useState('all');
  const [laboratories, setLaboratories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [scheduleDetails, setScheduleDetails] = useState({});

  // Obtener usuario actual al cargar el componente
  useEffect(() => {
    const user = ReserveService.getCurrentUser();
    setCurrentUser(user);

    fetchReservas();
    fetchLaboratories();
  }, []);

  // Actualizar reservas filtradas cuando cambien los criterios
  useEffect(() => {
    if (filterType === 'all') {
      setFilteredReservas(reservas);
    } else if (filterType === 'date' && selectedDate) {
      // Implementar filtrado por fecha seleccionada
      const filtered = reservas.filter(reserva => {
        // Lógica de filtrado por fecha
        return true; // Implementar lógica real según tu estructura de datos
      });
      setFilteredReservas(filtered);
    } else if (filterType === 'laboratory' && selectedLab !== 'all') {
      // Implementar filtrado por laboratorio seleccionado
      const filtered = reservas.filter(reserva => {
        // Aquí puedes implementar la lógica real de filtrado por laboratorio
        return true; // Implementar lógica real según tu estructura de datos
      });
      setFilteredReservas(filtered);
    }
  }, [filterType, selectedDate, selectedLab, reservas]);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = ReserveService.getCurrentUser();
      let data;

      // Decidir qué endpoint usar según el rol del usuario
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

      // Procesar datos de horarios si es necesario
      const scheduleDetailsObj = {};
      for (const reserva of data) {
        if (reserva.scheduleId) {
          try {
            // Simulación o llamada real para obtener detalles del horario
            const currentDate = new Date();
            scheduleDetailsObj[reserva.scheduleId] = {
              startHour: reserva.schedule?.startHour || "08:00",
              endHour: reserva.schedule?.endHour || "10:00",
              day: currentDate.getDay(),
              numberDay: currentDate.getDate(),
              month: currentDate.getMonth() + 1,
              year: currentDate.getFullYear(),
              laboratory: reserva.laboratory?.name || "LAB"
            };
          } catch (error) {
            console.warn(`No se pudieron obtener detalles del horario para ${reserva.scheduleId}`, error);
          }
        }
      }

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
      // Implementar llamada real al API o usar datos de ejemplo
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

        // Manejar diferentes formatos de reserva
        if (reserva.scheduleId) {
          await ReserveService.deleteReserveBySchedule({ id: reserva.scheduleId });
        } else if (reserva.schedule && reserva.schedule.id) {
          await ReserveService.deleteReserveBySchedule(reserva.schedule);
        } else if (reserva._id) {
          console.warn("No se pudo determinar el formato correcto para eliminar");
        }

        // Actualizar lista de reservas
        fetchReservas();
      } catch (err) {
        console.error('Error al eliminar reserva:', err);
        setError('No se pudo eliminar la reserva. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    }
  };

  // Funciones auxiliares para formateo
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

  const formatTime = (timeString) => {
    try {
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

  // Funciones para el calendario
  const renderCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDateObj = new Date(selectedYear, selectedMonth, i);
      const currentDateStr = currentDateObj.toISOString().split('T')[0];

      // Verificar si este día tiene reservas
      const hasReservation = reservas.some(reserva => {
        if (reserva.schedule && reserva.schedule.day) {
          try {
            const reservaDate = new Date(reserva.schedule.day);
            return reservaDate.getDate() === i &&
                  reservaDate.getMonth() === selectedMonth &&
                  reservaDate.getFullYear() === selectedYear;
          } catch (e) {
            return false;
          }
        } else if (reserva.scheduleId && scheduleDetails[reserva.scheduleId]) {
          const schedule = scheduleDetails[reserva.scheduleId];
          return schedule.year === selectedYear &&
                schedule.month === selectedMonth + 1 &&
                schedule.numberDay === i;
        }
        return false;
      });

      const isSelected = selectedDate === currentDateStr;
      const isAdmin = currentUser?.role === 'admin';

      days.push(
        <div
          key={i}
          className={`calendar-day ${hasReservation ? 'has-reservation' : ''} ${isSelected && isAdmin ? 'selected' : ''}`}
          onClick={isAdmin ? () => handleDateClick(currentDateStr) : undefined}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleDateClick = (dateStr) => {
    if (currentUser?.role !== 'admin') return;

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
    fetchReservas();
  };

  // Función para obtener el color según tipo de reserva (solo admin)
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

  // Función para obtener información del horario
  const getScheduleInfo = (reserva) => {
    if (reserva.schedule) {
      return {
        timeInfo: formatTime(reserva.schedule.startHour),
        dateInfo: formatDate(reserva.schedule.day),
        laboratory: reserva.laboratory?.name || "Laboratorio"
      };
    } else if (reserva.scheduleId && scheduleDetails[reserva.scheduleId]) {
      const schedule = scheduleDetails[reserva.scheduleId];

      if (!schedule.startHour || !schedule.endHour) {
        return {
          timeInfo: "Horario no disponible",
          dateInfo: "Fecha no disponible",
          laboratory: schedule.laboratory || "Laboratorio no especificado"
        };
      }

      const startHour = schedule.startHour;
      const endHour = schedule.endHour;
      const timeInfo = `${startHour} - ${endHour}`;

      let dateInfo = "Fecha no disponible";
      if (schedule.day !== undefined && schedule.numberDay && schedule.month && schedule.year) {
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
    } else {
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

  const isAdmin = currentUser?.role === 'admin';
  const containerClass = isAdmin ? "admin-reservas-container" : "reservas-container";
  const reservasToDisplay = isAdmin ? filteredReservas : reservas;

  return (
    <div className={containerClass}>
      <div className={isAdmin ? "admin-header" : ""}>
        <h1 className={isAdmin ? "admin-title" : "reservas-title"}>
          {isAdmin ? "Administrar Reservas" : "Mis Reservas"}
        </h1>

        {isAdmin && (
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
        )}
      </div>

      <div className={isAdmin ? "admin-content" : "reservas-content"}>
        <div className={isAdmin ? "reservas-list-container" : "reservas-list"}>
          {isAdmin && (
            <h2 className="section-title">
              {filterType === 'all' ? 'Todas las reservas' :
              filterType === 'date' ? `Reservas para ${formatDate(selectedDate)}` :
              `Reservas para ${laboratories.find(lab => lab.abbreviation === selectedLab)?.name || selectedLab}`}
            </h2>
          )}

          <div className={isAdmin ? "admin-reservas-list" : ""}>
            {reservasToDisplay.length === 0 ? (
              <div className={isAdmin ? "no-reservas" : "no-reservas"}>
                No hay reservas para mostrar
              </div>
            ) : (
              reservasToDisplay.map((reserva, index) => {
                // Obtener información de horario
                const scheduleInfo = getScheduleInfo(reserva);

                return isAdmin ? (
                  // Versión admin de la tarjeta de reserva
                  <div
                    className={`admin-reserva-card ${getReserveTypeColor(reserva.type)}`}
                    key={reserva._id || reserva.id || index}
                  >
                    <div className="reserva-header">
                      <div className="reserva-lab-name">
                        {scheduleInfo.laboratory}
                      </div>
                      <div className="reserva-date-time">
                        {scheduleInfo.dateInfo === "Fecha no disponible" && scheduleInfo.timeInfo === "Horario no disponible" ? (
                          <span className="unavailable-info">Fecha no disponible | Horario no disponible</span>
                        ) : (
                          `${scheduleInfo.dateInfo} | ${scheduleInfo.timeInfo}`
                        )}
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
                ) : (
                  // Versión usuario de la tarjeta de reserva
                  <div className="reserva-card" key={reserva.id || index}>
                    <div className="reserva-left">
                      <div className="user-icon-text">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="reserva-middle">
                      <div className="reserva-lab">
                        <strong>{scheduleInfo.laboratory}</strong>
                      </div>
                      <div>{currentUser.name}</div>
                      <div className="reserva-date">
                        {scheduleInfo.dateInfo} {scheduleInfo.timeInfo}
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
                );
              })
            )}
          </div>
        </div>

        <div className={isAdmin ? "admin-calendar-container" : "calendar-section"}>
          <div className={isAdmin ? "calendar-section" : ""}>
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
                const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
                const emptyCells = [];

                for (let i = 0; i < adjustedFirstDay; i++) {
                  emptyCells.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
                }

                return emptyCells;
              })()}
              {renderCalendarDays()}
            </div>
          </div>

          {isAdmin && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservas;