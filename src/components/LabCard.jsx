import React from 'react';
import '../pages/ListarLaboratorios/Laboratory.css';

/**
 * Componente que representa una tarjeta de laboratorio completa
 * @param {Object} lab - Datos del laboratorio
 * @param {number} index - Índice del laboratorio
 * @param {number} intensity - Intensidad de color (0-3)
 * @param {boolean} isActive - Si la tarjeta está expandida
 * @param {boolean} isCarouselView - Si está en vista carrusel
 * @param {Function} onToggle - Función para expandir/contraer
 * @param {Object} utils - Funciones de utilidad (formatDateTime, getDayOfWeek)
 * @param {boolean} isAdmin - Si debe mostrar controles de administrador
 */
const LabCard = ({ 
  lab, 
  index, 
  intensity, 
  isActive, 
  isCarouselView, 
  onToggle,
  utils,
  isAdmin = false 
}) => {
  const { formatDateTime, getDayOfWeek } = utils;

  // Renderiza el encabezado de la tarjeta
  const renderHeader = () => (
    <div className="card-header">
      <h2 className="lab-title">{lab.name}</h2>
      <span className="lab-abbr">{lab.abbreviation}</span>
    </div>
  );

  // Renderiza la vista previa (cuando está cerrada)
  const renderPreview = () => (
    <div className="card-preview">
      <div className="preview-icon"></div>
      <span className="click-more">Click para más detalles</span>
    </div>
  );

  // Renderiza horarios
  const renderSchedules = (schedules, limit = null) => {
    if (!schedules || schedules.length === 0) {
      return <span className="no-schedules">No hay horarios disponibles</span>;
    }

    const schedulesToShow = limit ? schedules.slice(0, limit) : schedules;
    
    return (
      <div className={limit ? "schedules-container" : "schedules-list"}>
        {schedulesToShow.map((h, i) => {
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
        
        {limit && schedules.length > limit && (
          <div className="schedule-item" style={{textAlign: 'center', fontStyle: 'italic'}}>
            <span>{schedules.length - limit} horarios más...</span>
          </div>
        )}
      </div>
    );
  };

  // Renderiza los detalles completos (cuando está expandido)
  const renderDetails = () => (
    <div className="lab-details">
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

      <div className="details-section">
        <h3 className="section-title">Horarios</h3>
        <div className="schedules-list">
          {renderSchedules(lab.scheduleReferences)}
        </div>
      </div>

      {isAdmin && (
        <div className="admin-controls">
          <button className="admin-button edit">Editar</button>
          <button className="admin-button delete">Borrar</button>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`laboratory-card intensity-${intensity}`}
      onClick={() => onToggle(index)}
    >
      {renderHeader()}
      
      {isCarouselView ? (
        renderPreview()
      ) : isActive ? (
        renderDetails()
      ) : (
        renderPreview()
      )}
    </div>
  );
};

export default LabCard;