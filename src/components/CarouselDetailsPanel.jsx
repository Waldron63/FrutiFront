import React from 'react';
import '../styles/Laboratory.css';

/**
 * Componente que muestra los detalles de un laboratorio debajo del carrusel
 */
const CarouselDetailsPanel = ({ lab, intensity, utils }) => {
  const { formatDateTime, getDayOfWeek } = utils;

  const renderSchedules = () => {
    if (!lab.scheduleReferences || lab.scheduleReferences.length === 0) {
      return <span className="no-schedules">No hay horarios disponibles</span>;
    }

    return (
      <div className="schedules-list">
        {lab.scheduleReferences.map((h, i) => {
          const opening = formatDateTime(h.openingTime);
          const closing = formatDateTime(h.closingTime);
          const dayOfWeek = h.dayOfWeek ? getDayOfWeek(h.dayOfWeek) : opening.date;

          return (
            <div key={i} className="schedule-item">
              <span className="schedule-date">{dayOfWeek}</span>
              <span className="schedule-time">
                {opening.time} - {closing.time}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="carousel-details-below">
      <div className="carousel-details-grid">
        {/* Columna izquierda: Horarios */}
        <div className="details-column">
          <div className="details-section">
            <h3 className="section-title">Horarios</h3>
            {renderSchedules()}
          </div>
        </div>

        {/* Columna derecha: Resto de información */}
        <div className="details-column">
          <div className="details-section">
            <h3 className="section-title">Características</h3>
            <div className="detail-row">
              <span className="detail-label">Capacidad:</span>
              <span className="detail-value">{lab.totalCapacity}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Ubicación:</span>
              <span className="detail-value">{lab.location}</span>
            </div>
          </div>

          <div className="details-section">
            <h3 className="section-title">Recursos Físicos</h3>
            <div className="resources-grid">
              <div className="resource-item">
                <div className={`resource-icon ${lab.physicalResource?.projector ? 'available' : 'unavailable'}`}>
                  <span className="icon">📽️</span>
                </div>
                <span className="resource-name">Proyector</span>
              </div>
              <div className="resource-item">
                <div className={`resource-icon ${lab.physicalResource?.TV ? 'available' : 'unavailable'}`}>
                  <span className="icon">📺</span>
                </div>
                <span className="resource-name">Televisor</span>
              </div>
              <div className="resource-item">
                <div className="resource-icon available">
                  <span className="icon">💻</span>
                </div>
                <span className="resource-name">{lab.physicalResource?.totalComputer || 0} PCs</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3 className="section-title">Software</h3>
            <div className="detail-row">
              <span className="detail-label">OS:</span>
              <span className="detail-value">{lab.softwareResource?.operativeSystem || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Partición:</span>
              <span className="detail-value">{lab.softwareResource?.partition ? 'Sí' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselDetailsPanel;