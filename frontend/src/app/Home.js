import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.css';  // Importar el CSS separado

const Home = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificar el token (parsear el payload) para extraer el username
      const { username } = JSON.parse(atob(token.split('.')[1]));
      setUsername(username);
    } else {
      // Si no hay token, redirigir al login
      router.push('/login');
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido a la Home</h1>
      {username && <h2 className={styles.subtitle}>Hola, {username}!</h2>}
    </div>
  );
};

export default Home;
