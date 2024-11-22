// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventModal from './EventModal';
import styles from '../../styles/EventList.module.css';
import { useAuth } from '../context/AuthContext';

const EventList = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/event', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data.collection);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [token]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className={styles.container}>
      <h2>Eventos Disponibles</h2>
      <div className={styles.eventGrid}>
        {events.length === 0 ? (
          <p>No hay eventos disponibles.</p>
        ) : (
          events.map((event) => (
            <div className={styles.eventCard} key={event.id}>
              <h3>{event.name}</h3>
              <button className={styles.detailButton} onClick={() => handleEventClick(event)}>Detalles</button>
            </div>
          ))
        )}
      </div>
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={closeModal} />
      )}
    </div>
  );
};

export default EventList;
