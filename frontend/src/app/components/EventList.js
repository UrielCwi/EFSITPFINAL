import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventModal from './EventModal'; // Asegúrate de que la ruta sea correcta
import styles from '../../styles/EventList.module.css'; // Asegúrate de que la ruta sea correcta

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/event');
        setEvents(response.data.collection); // Accede a la propiedad 'collection'
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    fetchEvents();
  }, []);

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
          events.map((event, index) => (
            <div className={styles.eventCard} key={event.id}>
              <h3>{event.name}</h3>
              <button onClick={() => handleEventClick(event)}>Detalles</button>
              {(index + 1) % 3 === 0 && <div className={styles.break}></div>} {/* Saltar cada 3 */}
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
