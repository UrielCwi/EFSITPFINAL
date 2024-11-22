import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/DetailsModal.module.css';

const DetailsModal = ({ item, type, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${type}/${item.id}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles', error);
      }
    };

    fetchDetails();
  }, [item, type]);

  const closeModal = () => {
    onClose();
  };

  if (!details) {
    return <div className={styles.loading}>Cargando detalles...</div>;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {type === 'category-details' ? 'Detalles de la Categoría' : 'Detalles de la Ubicación'}
        </h2>
        <div className={styles.detailsContainer}>
          {type === 'category-details' ? (
            <>
              <p><strong>Nombre:</strong> {details.name}</p>
              <p><strong>Descripción:</strong> {details.description}</p>
            </>
          ) : (
            <>
              <p><strong>Nombre:</strong> {details.name}</p>
              <p><strong>Dirección Completa:</strong> {details.full_address}</p>
              <p><strong>Capacidad Máxima:</strong> {details.max_capacity}</p>
              <p><strong>Latitud:</strong> {details.latitude}</p>
              <p><strong>Longitud:</strong> {details.longitude}</p>
            </>
          )}
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.closeButton} onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
