// src/components/FormularioEvento.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../app/context/AuthContext';
import Navbar from '../app/components/Navbar'; // Importa el componente Navbar
import Footer from '../app/components/Footer'; // Asegúrate de que la ruta sea correcta
import styles from '../styles/FormularioEvento.module.css';

const FormularioEvento = () => {
  const { token } = useAuth();
  const [evento, setEvento] = useState({
    name: '',
    description: '',
    id_event_category: '',
    id_event_location: '',
    id_tag: '',
    start_date: '',
    duration_in_minutes: '',
    price: '',
    enabled_for_enrollment: false,
    max_assistance: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [eventLocations, setEventLocations] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, locRes, eventsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/event-category/', {
            headers: 
            { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/event-location/', {
            headers: 
            { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/event/', {
            headers: 
            { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCategorias(catRes.data.collection);
        setEventLocations(locRes.data.collection);
 

        const events = eventsRes.data.collection;
        const extractedTags = events.reduce((acc, evento) => {
          if (evento.tags && Array.isArray(evento.tags)) {
            evento.tags.forEach(tag => {
              acc[tag.name] = tag;
            });
          }
          return acc;
        }, {});

        setTags(Object.values(extractedTags));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvento({
      ...evento,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/event',
        { ...evento },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Evento creado exitosamente');
      setEvento({
        name: '',
        description: '',
        id_event_category: '',
        id_event_location: '',
        id_tag: '',
        start_date: '',
        duration_in_minutes: '',
        price: '',
        enabled_for_enrollment: false,
        max_assistance: '',
      });
    } catch (error) {
      alert('Error al crear el evento');
    }
  };


  return (
    <div className={styles.container}>
      <Navbar /> {/* Agrega el Navbar aquí */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Crear Evento</h2>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={evento.name}
          onChange={handleChange}
          placeholder="Nombre del Evento"
          required
        />
        <textarea
          className={styles.input}
          name="description"
          value={evento.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <select
          className={styles.input}
          name="id_event_category"
          value={evento.id_event_category}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
        <select
          className={styles.input}
          name="id_event_location"
          value={evento.id_event_location}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Ubicación</option>
          {eventLocations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <select
          className={styles.input}
          name="id_tag"
          value={evento.id_tag}
          onChange={handleChange}
        >
          <option value="">Seleccionar Etiqueta</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <input
          className={styles.input}
          type="datetime-local"
          name="start_date"
          value={evento.start_date}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="number"
          name="duration_in_minutes"
          value={evento.duration_in_minutes}
          onChange={handleChange}
          placeholder="Duración en minutos"
          required
        />
        <input
          className={styles.input}
          type="number"
          name="price"
          value={evento.price}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        <input
          className={styles.input}
          type="number"
          name="max_assistance"
          value={evento.max_assistance}
          onChange={handleChange}
          placeholder="Máxima Asistencia"
          required
        />
        <label>
          <input
            type="checkbox"
            name="enabled_for_enrollment"
            checked={evento.enabled_for_enrollment}
            onChange={handleChange}
          />
          Habilitado para Inscripción
        </label>
        <button type="submit" className={styles.button}>Crear Evento</button>
      </form>
      <Footer/>
    </div>
  );
};

export default FormularioEvento;
