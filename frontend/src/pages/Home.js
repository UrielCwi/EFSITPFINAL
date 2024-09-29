import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';  // CSS separado

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { username } = JSON.parse(atob(token.split('.')[1]));  // Decodificar token
      setUsername(username);
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
