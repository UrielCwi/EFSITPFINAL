import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/DetailsModal.module.css';
import { useAuth } from '../context/AuthContext';

const DetailsModal = ({ item, apiType, onClose }) => {
  const [details, setDetails] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${apiType}/${item.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        setDetails(response.data[0]);
      } catch (error) {
        console.error('Error al obtener los detalles:', error.response?.data || error.message);
      }
    };

    fetchDetails();
  }, [apiType, item]);

  if (!details) {   
    return (
      <div className={styles.modal}>
        <p>Cargando detalles...</p>
      </div>
    );
  }

  return (
    <div className={styles.modal}>
      <h2>Detalles de {apiType === 'event-category' ? 'Categoría' : 'Ubicación'}</h2>
      <div className={styles.details}>
        {Object.entries(details).map(([key, value]) => (
            <div key={key}>
            <strong>{key}:</strong>{' '}
            {typeof value === 'object' && value !== null ? (
                // Si el valor es un objeto, lo convertimos en una lista de sus propiedades
                <ul>
                {Object.entries(value).map(([subKey, subValue]) => (
                    <li key={subKey}>
                    <strong>{subKey}:</strong> {subValue}
                    </li>
                ))}
                </ul>
            ) : (
                value
            )}
            </div>
        ))}
        </div>
      <button className={styles.closeButton} onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};

export default DetailsModal;
