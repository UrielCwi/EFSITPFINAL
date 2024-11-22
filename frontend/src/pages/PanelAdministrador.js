import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../app/context/AuthContext';
import CategoryModal from '../app/components/CategoryModal';
import LocationModal from '../app/components/LocationModal';
import styles from '../styles/AdminPanel.module.css';
import Navbar from '@/app/components/Navbar';

const AdminPanel = () => {
  const { token, username, isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);
  console.log(isAdmin)

  useEffect(() => {
    if (isAdmin) {
      fetchCategories();
      fetchLocations();
    }
  }, [token, username]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/event-category', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data.collection);
      console.log(response.data.collection)
    } catch (error) {
      alert('Error al cargar las categorías');
      console.error(error.response?.data || error.message);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/event-location', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(response.data.collection);
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

  if (!isAdmin) return <p>No tienes permiso para acceder a esta página.</p>;

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>Panel de Administración</h1>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'categories' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categorías
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'locations' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('locations')}
        >
          Ubicaciones
        </button>
      </div>
      {activeTab === 'categories' ? (
        <div className={styles.list}>
          {categories.map((category) => (
            <div key={category.id} className={styles.item}>
              <p className={styles.itemText}>{category.name}</p>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.editButton}
                  onClick={() => openModal(category, 'categories')}
                >
                  Editar
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(category.id, 'categories')}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button
            className={styles.addButton}
            onClick={() => openModal(null, 'categories')}
          >
            Agregar Categoría
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {locations.map((location) => (
            <div key={location.id} className={styles.item}>
              <p className={styles.itemText}>{location.name}</p>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.editButton}
                  onClick={() => openModal(location, 'locations')}
                >
                  Editar
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(location.id, 'locations')}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button
            className={styles.addButton}
            onClick={() => openModal(null, 'locations')}
          >
            Agregar Ubicación
          </button>
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
}

export default AdminPanel;
