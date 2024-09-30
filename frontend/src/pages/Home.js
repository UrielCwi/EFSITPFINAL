import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar si estamos en el cliente
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');  // Redirigir al login si no hay token
      } else {
        const { username } = JSON.parse(atob(token.split('.')[1]));  // Decodificar token
        setUsername(username);
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1>Bienvenido a la Home</h1>
      {username && <h2>Hola, {username}!</h2>}
    </div>
  );
};

export default Home;
