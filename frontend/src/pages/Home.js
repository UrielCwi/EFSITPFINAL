import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import EventList from '@/app/components/EventList';
import { AuthContext } from '@/app/context/AuthContext';

const Home = () => {
  const { token, username, isAdmin } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [statusAdmin, setStatus] = useState(false)
  console.log(isAdmin)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log(storedToken)
    if (storedToken) {
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !token) {
      router.push('/Login');
    }
  }, [loading, token, router]);

  useEffect(() => {
    if(isAdmin === null){
      setStatus(false)
    } else if(isAdmin !== null) {
      setStatus(true)
    }
  }, [isAdmin]);

  const handleCreateEvent = () => {
    router.push('/FormularioEvento');
  };
  const handlePanelAdmin = () => {
    router.push('/PanelAdministrador')
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Bienvenido a la Home</h1>
      {username && <h2>Hola, {username}!</h2>}
      <EventList />
      <Footer />
      <button onClick={handleCreateEvent} className={styles.createEventButton}>
        Crear Evento
      </button>
      {(isAdmin !== true && statusAdmin === true) ? (
        <p></p>
      ) : (
        isAdmin === true && (
          <button onClick={handlePanelAdmin} className={styles.createEventButton}>
            Panel de Administrador
          </button>
        )
      )}
    </div>
  );
};

export default Home;
