import React from 'react';
import styles from '../../styles/EventModal.module.css'; // Asegúrate de que la ruta sea correcta

const EventModal = ({ event, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        <p>Precio: {event.price}</p>
        <p>Fecha: {new Date(event.start_date).toLocaleString()}</p>
        <p>Duración: {event.duration_in_minutes} minutos</p>
        <p>Ubicación: {event.event_location.name}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EventModal;
