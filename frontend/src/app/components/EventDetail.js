import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const EventDetail = ({ eventId }) => {
  const [eventDetail, setEventDetail] = useState(null);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/event/${eventId}`);
        setEventDetail(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  const handleSubscribe = async () => {
    if (eventDetail.subscribers.length < eventDetail.max_assistance) {
      try {
        await axios.post(`http://localhost:5000/api/event/${eventId}/enrollment`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Te has suscrito al evento!');
      } catch (error) {
        alert('Error al suscribirse al evento');
        console.error('Error subscribing to event:', error);
      }
    } else {
      alert('Lo sentimos, el evento está completo.');
    }
  };

  if (!eventDetail) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{eventDetail.name}</h1>
      <p>{eventDetail.description}</p>
      <button onClick={handleSubscribe}>Suscribirse</button>
    </div>
  );
};

export default EventDetail;
