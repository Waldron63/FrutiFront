import React, { useEffect, useState } from 'react';
import './Laboratory.css';
import LabCard from '../../components/LabCard';
import CarouselDetailsPanel from '../../components/CarouselDetailsPanel';
import labService from '../../services/labService';

const ListarLaboratorios = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [activo, setActivo] = useState(null);
  const [vista, setVista] = useState('grid');
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    // Usa el servicio para cargar los datos
    labService.getLaboratories()
      .then(data => setLaboratorios(data))
      .catch(err => console.error("Error cargando laboratorios", err));
  }, []);

  const toggleExpand = (index) => {
    setActivo(activo === index ? null : index);
  };

  const labsVisibles = vista === 'carousel' ? laboratorios.slice(indice, indice + 3) : laboratorios;

  // Función para formatear fechas correctamente
  const formatDateTime = (timeString) => {
    try {
      // Verificar si el formato es solo hora (HH:MM)
      if (/^\d{2}:\d{2}$/.test(timeString)) {
        // Si es solo hora, devolvemos directamente ese formato
        return { date: 'N/A', time: timeString };
      }

      // Para fechas completas, continuar con el código existente
      const date = new Date(timeString);

      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        return { date: 'Fecha no disponible', time: 'Hora no disponible' };
      }

      // Formatear fecha y hora
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return { date: formattedDate, time: formattedTime };
    } catch (error) {
      return { date: 'Fecha no disponible', time: 'Hora no disponible' };
    }
  };

  // Función para obtener el día de la semana en español
  const getDayOfWeek = (dayString) => {
    const days = {
      'MONDAY': 'Lunes',
      'TUESDAY': 'Martes',
      'WEDNESDAY': 'Miércoles',
      'THURSDAY': 'Jueves',
      'FRIDAY': 'Viernes',
      'SATURDAY': 'Sábado',
      'SUNDAY': 'Domingo'
    };

    return days[dayString] || dayString;
  };

  // Utilidades para pasar a los componentes
  const utils = { formatDateTime, getDayOfWeek };

  return (
    <div className="container-labs">
      <div className="header-section">
        <h1 className="main-title">Laboratorios de Sistemas</h1>
        <div className="view-controls">
          <span className="view-label">Vista</span>
          <button className="toggle-button" onClick={() => setVista(vista === 'grid' ? 'carousel' : 'grid')}>
            {vista === 'grid' ? 'Carrusel' : 'Cuadrícula'}
          </button>
        </div>
      </div>

      <div className={`laboratory-grid ${vista}`}>
        {labsVisibles.map((lab, idx) => {
          const index = vista === 'carousel' ? indice + idx : idx;
          const intensity = index % 4;

          return (
            <LabCard
              key={index}
              lab={lab}
              index={index}
              intensity={intensity}
              isActive={activo === index}
              isCarouselView={vista === 'carousel'}
              onToggle={toggleExpand}
              utils={utils}
            />
          );
        })}
      </div>

      {vista === 'carousel' && (
        <div className="carousel-controls">
          <button
            className="carousel-button prev"
            onClick={() => setIndice(Math.max(0, indice - 1))}
            disabled={indice === 0}
          >
            &larr;
          </button>
          <div className="pagination">
            {Array.from({ length: Math.ceil(laboratorios.length / 3) }).map((_, i) => (
              <span
                key={i}
                className={`pagination-dot ${i === Math.floor(indice / 3) ? 'active' : ''}`}
                onClick={() => setIndice(i * 3)}
              ></span>
            ))}
          </div>
          <button
            className="carousel-button next"
            onClick={() => setIndice(Math.min(laboratorios.length - 3, indice + 1))}
            disabled={indice + 3 >= laboratorios.length}
          >
            &rarr;
          </button>
        </div>
      )}

      {vista === 'carousel' && activo !== null && (
        <CarouselDetailsPanel
          lab={laboratorios[activo]}
          intensity={activo % 4}
          utils={utils}
        />
      )}
    </div>
  );
};

export default ListarLaboratorios;