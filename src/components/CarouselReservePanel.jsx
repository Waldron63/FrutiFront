import React from "react";
import "../styles/Laboratory.css";

/**
 * Componente que muestra los detalles de una reserva debajo del carrusel
 */
const CarouselReservePanel = ({ reserve, intensity, utils }) => {
  const { formatDateTime, getDayOfWeek } = utils;

  return (
    <div className="carousel-details-below">
      <div className="carousel-details-grid">
        {/* Columna izquierda: Horarios */}
        <div className="details-column">
          <div className="details-section">
            <h3 className="section-title">Horario</h3>
            <div className="detail-row">
              <span className="detail-label">Hora de Inicio:</span>
              <span className="detail-value">{reserve.startHour}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Día:</span>
              <span className="detail-value">{reserve.numberDay}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Mes:</span>
              <span className="detail-value">{reserve.month}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Año:</span>
              <span className="detail-value">{reserve.year}</span>
            </div>
          </div>
        </div>

        {/* Columna derecha: Resto de información */}
        <div className="details-column">
          <div className="details-section">
            <h3 className="section-title">Características</h3>
            <div className="detail-row">
              <span className="detail-label">Lugar:</span>
              <span className="detail-value">{reserve.laboratory}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Estado:</span>
              <span className="detail-value">{reserve.state}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselReservePanel;
