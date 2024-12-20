import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryModal = ({ category, onClose, fetchCategories }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    // Actualiza el estado cuando cambia el objeto `category`
    if (category) {
      setName(category.name || '');
    }
  }, [category]);

  const isEditing = !!category;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/event-category/${category.id}`, { name });
      } else {
        await axios.post('http://localhost:5000/api/event-category', { name });
      }
      fetchCategories();
      onClose();
    } catch (error) {
      alert('Error al guardar la categoría');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Categoría' : 'Agregar Categoría'}</h2>
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

export default CategoryModal;
