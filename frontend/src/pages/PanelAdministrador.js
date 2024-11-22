import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../app/context/AuthContext';
import CategoryModal from '../app/components/CategoryModal';
import LocationModal from '../app/components/LocationModal';
import DetailsModal from '../app/components/DetailsModal';
import styles from '../styles/AdminPanel.module.css';
import Navbar from '@/app/components/Navbar';
import Router from 'next/router';

const AdminPanel = () => {
  const { token, username, isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusAdmin, setStatus] = useState(false)


  console.log(isAdmin)
  useEffect(() => {
    if (isAdmin) {
      fetchCategories();
      fetchLocations();
    }
    setLoading(false);
  }, [token, username]);

  useEffect(() => {
    if(isAdmin === null){
      setStatus(false)
    } else if(isAdmin !== null) {
      setStatus(true)
    }
  }, [isAdmin]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/event-category', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data.collection);
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
      window.location.reload()
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

  if (isAdmin === true && statusAdmin === true) {
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
                      className={styles.detailButton}
                      onClick={() => openModal(category, 'category-details')}
                    >
                      Detalles
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(category.id, 'event-category')}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
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
                      className={styles.detailButton}
                      onClick={() => openModal(location, 'location-details')}
                    >
                      Detalles
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(location.id, 'event-location')}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
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
          {(modalType === 'category-details' || modalType === 'location-details') && (
            <DetailsModal
              item={selectedItem}
              apiType={modalType === 'category-details' ? 'event-category' : 'event-location'}
              onClose={closeModal}
            />
          )}
        </div>
      );
  } else {
    return (
        <div>
          <p>No tienes permiso para acceder a esta página.</p>
          <button className={styles.returnButton} onClick={() => Router.back()}>Volver</button>
        </div>
      );
  }
};

export default AdminPanel;