import React from 'react';
import '../styles/Laboratory.css';

/**
 * Componente que representa una tarjeta de laboratorio completa
 * @param {Object} reserve - Datos de la reserva
 * @param {number} index - Índice del laboratorio
 * @param {number} intensity - Intensidad de color (0-3)
 * @param {boolean} isActive - Si la tarjeta está expandida
 * @param {boolean} isCarouselView - Si está en vista carrusel
 * @param {Function} onToggle - Función para expandir/contraer
 * @param {Object} utils - Funciones de utilidad (formatDateTime, getDayOfWeek)
 * @param {boolean} isAdmin - Si debe mostrar controles de administrador
 */
const ReserveCard = ({ 
  reserve, 
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
      <h2 className="lab-title">{reserve.reason}</h2>
      <span className="lab-abbr">{reserve.type}</span>
    </div>
  );

  // Renderiza la vista previa (cuando está cerrada)
  const renderPreview = () => (
    <div className="card-preview">
      <div className="preview-icon"></div>
      <span className="click-more">Click para más detalles</span>
    </div>
  );


  // Renderiza los detalles completos (cuando está expandido)
  const renderDetails = () => (
    <div className="lab-details">
      <div className="details-section">
        <h3 className="section-title">Características</h3>
        <div className="detail-row">
          <span className="detail-label">laboratorio:</span>
          <span className="detail-value">{reserve.laboratory}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">hora:</span>
          <span className="detail-value">{reserve.startHour}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">dia:</span>
          <span className="detail-value">{reserve.day}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">mes:</span>
          <span className="detail-value">{reserve.month}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">año:</span>
          <span className="detail-value">{reserve.year}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">estado:</span>
          <span className="detail-value">{reserve.state}</span>
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

export default ReserveCard;