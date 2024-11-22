import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CategoryModal from './CategoryModal';
import LocationModal from './LocationModal';
import styles from '../../styles/AdminPanel.module.css';

const AdminPanel = () => {
  const { token, username } = useAuth();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    if (token && username === 'admin') {
      fetchCategories();
      fetchLocations();
    }
  }, [token, username]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      alert('Error al cargar las categorías');
      console.error(error.response?.data || error.message);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/locations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(response.data);
    } catch (error) {
      alert('Error al cargar las ubicaciones');
      console.error(error.response?.data || error.message);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`http://localhost:5000/api/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`${type === 'categories' ? 'Categoría' : 'Ubicación'} eliminada`);
      type === 'categories' ? fetchCategories() : fetchLocations();
    } catch (error) {
      alert('Error al eliminar');
      console.error(error.response?.data || error.message);
    }
  };

  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  if (username !== 'admin') return <p>No tienes permiso para acceder a esta página.</p>;

  return (
    <div className={styles.container}>
      <h1>Panel de Administración</h1>
      <div className={styles.tabs}>
        <button
          className={activeTab === 'categories' ? styles.active : ''}
          onClick={() => setActiveTab('categories')}
        >
          Categorías
        </button>
        <button
          className={activeTab === 'locations' ? styles.active : ''}
          onClick={() => setActiveTab('locations')}
        >
          Ubicaciones
        </button>
      </div>
      {activeTab === 'categories' ? (
        <div className={styles.list}>
          {categories.map((category) => (
            <div key={category.id} className={styles.item}>
              <p>{category.name}</p>
              <button onClick={() => openModal(category, 'categories')}>Editar</button>
              <button onClick={() => handleDelete(category.id, 'categories')}>Eliminar</button>
            </div>
          ))}
          <button onClick={() => openModal(null, 'categories')}>Agregar Categoría</button>
        </div>
      ) : (
        <div className={styles.list}>
          {locations.map((location) => (
            <div key={location.id} className={styles.item}>
              <p>{location.name}</p>
              <button onClick={() => openModal(location, 'locations')}>Editar</button>
              <button onClick={() => handleDelete(location.id, 'locations')}>Eliminar</button>
            </div>
          ))}
          <button onClick={() => openModal(null, 'locations')}>Agregar Ubicación</button>
        </div>
      )}
      {modalType === 'categories' && (
        <CategoryModal
          category={selectedItem}
          onClose={closeModal}
          fetchCategories={fetchCategories}
        />
      )}
      {modalType === 'locations' && (
        <LocationModal
          location={selectedItem}
          onClose={closeModal}
          fetchLocations={fetchLocations}
        />
      )}
    </div>
  );
};

export default AdminPanel;
