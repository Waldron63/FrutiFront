
import React, { useState, useEffect } from 'react';
import '../styles/Laboratory.css';

const LabCardAdmin = ({
  lab,
  index,
  intensity,
  isActive,
  onToggle,
  utils,
  onUpdate,
  onDelete
}) => {
  const { formatDateTime, getDayOfWeek } = utils;
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({...lab});
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Actualizar editData cuando cambia el laboratorio
  useEffect(() => {
    setEditData({...lab});
  }, [lab]);

  // Prevenir que el click en campos editables propague al toggle
  const handleFieldClick = (e) => {
    if (editMode) {
      e.stopPropagation();
    }
  };

  // Manejar cambios en campos editables
  const handleInputChange = (e, field, section = null) => {
    e.stopPropagation();

    if (section) {
      setEditData({
        ...editData,
        [section]: {
          ...editData[section],
          [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }
      });
    } else {
      setEditData({
        ...editData,
        [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
      });
    }
  };

  // Guardar cambios
  const handleSaveChanges = (e) => {
    e.stopPropagation();
    onUpdate(editData);
    setEditMode(false);
  };

  // Cancelar edición
  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setEditData({...lab});
    setEditMode(false);
  };

  // Renderiza el encabezado de la tarjeta
  const renderHeader = () => (
    <div className="card-header">
      {editMode ? (
        <>
          <input
            type="text"
            className="edit-lab-title"
            value={editData.name || ''}
            onChange={(e) => handleInputChange(e, 'name')}
            onClick={handleFieldClick}
          />
          <input
            type="text"
            className="edit-lab-abbr"
            value={editData.abbreviation || ''}
            onChange={(e) => handleInputChange(e, 'abbreviation')}
            onClick={handleFieldClick}
          />
        </>
      ) : (
        <>
          <h2 className="lab-title">{lab.name}</h2>
          <span className="lab-abbr">{lab.abbreviation}</span>
        </>
      )}
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
  const renderSchedules = () => {
    return (
      <div className="details-section">
        <h3 className="section-title">Horarios</h3>
        <div className="schedules-list">
          {lab.scheduleReferences && lab.scheduleReferences.length > 0 ? (
            lab.scheduleReferences.map((h, i) => {
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
            })
          ) : (
            <span className="no-schedules">No hay horarios disponibles</span>
          )}
        </div>
        <button className="toggle-button add-schedule-btn">
          Agregar Horario
        </button>
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
          {editMode ? (
            <select
              className="edit-detail-value"
              value={editData.totalCapacity || ''}
              onChange={(e) => handleInputChange(e, 'totalCapacity')}
              onClick={handleFieldClick}
            >
              {Array.from({length: 50}, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          ) : (
            <span className="detail-value">{lab.totalCapacity}</span>
          )}
        </div>
        <div className="detail-row">
          <span className="detail-label">Ubicación:</span>
          {editMode ? (
            <input
              type="text"
              className="edit-detail-value"
              value={editData.location || ''}
              onChange={(e) => handleInputChange(e, 'location')}
              onClick={handleFieldClick}
            />
          ) : (
            <span className="detail-value">{lab.location}</span>
          )}
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
            {editMode && (
              <select
                className="edit-resource-value"
                value={editData.physicalResource?.projector ? 'Si' : 'No'}
                onChange={(e) => handleInputChange(e, 'projector', 'physicalResource')}
                onClick={handleFieldClick}
              >
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
            )}
          </div>
          <div className="resource-item">
            <div className={`resource-icon ${lab.physicalResource?.TV ? 'available' : 'unavailable'}`}>
              <span className="icon">📺</span>
            </div>
            <span className="resource-name">Televisor</span>
            {editMode && (
              <select
                className="edit-resource-value"
                value={editData.physicalResource?.TV ? 'Si' : 'No'}
                onChange={(e) => handleInputChange(e, 'TV', 'physicalResource')}
                onClick={handleFieldClick}
              >
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
            )}
          </div>
          <div className="resource-item">
            <div className="resource-icon available">
              <span className="icon">💻</span>
            </div>
            <span className="resource-name">PCs</span>
            {editMode ? (
              <select
                className="edit-resource-value"
                value={editData.physicalResource?.totalComputer || 0}
                onChange={(e) => handleInputChange(e, 'totalComputer', 'physicalResource')}
                onClick={handleFieldClick}
              >
                {Array.from({length: 50}, (_, i) => i).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            ) : (
              <span>{lab.physicalResource?.totalComputer || 0}</span>
            )}
          </div>
        </div>
      </div>

      <div className="details-section">
        <h3 className="section-title">Software</h3>
        <div className="detail-row">
          <span className="detail-label">OS:</span>
          {editMode ? (
            <input
              type="text"
              className="edit-detail-value"
              value={editData.softwareResource?.operativeSystem || ''}
              onChange={(e) => handleInputChange(e, 'operativeSystem', 'softwareResource')}
              onClick={handleFieldClick}
            />
          ) : (
            <span className="detail-value">{lab.softwareResource?.operativeSystem || 'N/A'}</span>
          )}
        </div>
        <div className="detail-row">
          <span className="detail-label">Partición:</span>
          {editMode ? (
            <select
              className="edit-detail-value"
              value={editData.softwareResource?.partition ? 'Si' : 'No'}
              onChange={(e) => handleInputChange(e, 'partition', 'softwareResource')}
              onClick={handleFieldClick}
            >
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
          ) : (
            <span className="detail-value">{lab.softwareResource?.partition ? 'Sí' : 'No'}</span>
          )}
        </div>
      </div>

      {renderSchedules()}

      <div className="admin-actions">
        {editMode ? (
          <>
            <button
              className="toggle-button primary"
              onClick={handleSaveChanges}
            >
              Guardar Cambios
            </button>
            <button
              className="toggle-button secondary"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className="toggle-button primary"
              onClick={(e) => {
                e.stopPropagation();
                setEditMode(true);
              }}
            >
              Editar Laboratorio
            </button>
            <button
              className="toggle-button danger"
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmDelete(true);
              }}
            >
              Eliminar Laboratorio
            </button>
          </>
        )}
      </div>

      {showConfirmDelete && (
        <div className="delete-confirmation">
          <p>¿Está seguro que desea eliminar este laboratorio?</p>
          <div className="confirmation-buttons">
            <button
              className="toggle-button danger"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(lab.abbreviation);
                setShowConfirmDelete(false);
              }}
            >
              Sí, eliminar
            </button>
            <button
              className="toggle-button secondary"
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmDelete(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`laboratory-card intensity-${intensity} ${editMode ? 'edit-mode' : ''}`}
      onClick={() => !editMode && onToggle(index)}
    >
      {renderHeader()}

      {isActive ? renderDetails() : renderPreview()}
    </div>
  );
};

export default LabCardAdmin;
