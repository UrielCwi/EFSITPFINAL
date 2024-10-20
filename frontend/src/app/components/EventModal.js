// src/components/EventModal.js
import React from 'react';
import styles from '../../styles/EventModal.module.css';
import { useRouter } from 'next/router';

const EventModal = ({ event, onClose }) => {
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`/event/${event.id}`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        <p>Precio: {event.price}</p>
        <p>Fecha: {new Date(event.start_date).toLocaleString()}</p>
        <p>Duración: {event.duration_in_minutes} minutos</p>
        <p>Ubicación: {event.event_location.name}</p>
        <button onClick={handleDetailsClick}>Ver Detalles</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EventModal;
