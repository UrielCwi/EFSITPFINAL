import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationModal = ({ location, onClose, fetchLocations }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    // Actualiza el estado cuando cambia el objeto `location`
    if (location) {
      setName(location.name || '');
    }
  }, [location]);

  const isEditing = !!location;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/event-location/${location.id}`, { name });
      } else {
        await axios.post('http://localhost:5000/api/event-location', { name });
      }
      fetchLocations();
      onClose();
    } catch (error) {
      alert('Error al guardar la ubicación');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Ubicación' : 'Agregar Ubicación'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default LocationModal;
