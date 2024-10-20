import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../../app/context/AuthContext';
import Navbar from '../../app/components/Navbar'; // Asegúrate de que la ruta sea correcta
import Footer from '../../app/components/Footer'; // Asegúrate de que la ruta sea correcta
import styles from '../../styles/EventDetail.module.css';

const EventDetail = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [eventDetail, setEventDetail] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (eventId) {
      const fetchEventDetail = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/event/${eventId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEventDetail(response.data);
        } catch (error) {
          const errorMessage = error.response ? error.response.data : error.message;
          alert(`Error fetching event details: ${errorMessage.error}`);
          console.error('Error fetching event details:', errorMessage);
        }
      };

      fetchEventDetail();
    }
  }, [eventId, token]);

  const handleSubscribe = async () => {
    try {
      await axios.post(`http://localhost:5000/api/event/${eventId}/enrollment`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Te has suscrito al evento!');
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      alert(`Error al suscribirse al evento: ${errorMessage.error}`);
      console.error('Error subscribing to event:', errorMessage);
    }
  };

  if (!eventDetail) return <div>Cargando...</div>;

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>{eventDetail[0].name}</h1>
      <p className={styles.paragraph}>{eventDetail[0].description}</p>
      <p className={styles.paragraph}>Precio: {eventDetail[0].price}</p>
      <p className={styles.paragraph}>Fecha: {new Date(eventDetail[0].start_date).toLocaleString()}</p>
      <p className={styles.paragraph}>Duración: {eventDetail[0].duration_in_minutes} minutos</p>
      <p className={styles.paragraph}>Ubicación: {eventDetail[0].event_location.name}</p>
      <button className={styles.button} onClick={handleSubscribe}>Suscribirse</button>
      <Footer /> {/* Agregar el Footer aquí */}
    </div>
  );
};

export default EventDetail;
