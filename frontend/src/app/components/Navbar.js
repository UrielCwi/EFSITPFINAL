// components/Navbar.js
import styles from '../../styles/Navbar.module.css'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    console.log(storedUsername)
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // También puedes limpiar el username
    router.push('/login');
  };

  const handleRedirectToHome = () => {
    // Refresca la página para ir a home
    router.push('/home');
    // Esto se puede ajustar si se quiere hacer un reload completo
    // window.location.reload(); // Descomenta esto si necesitas un reload completo
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        <span onClick={handleRedirectToHome} style={{ cursor: 'pointer', color: 'white' }}>
          Sitio de urias
        </span>
      </div>
      <div className={styles.userSection}>
        <span>{username || 'Invitado'}</span> {/* Muestra 'Invitado' si no hay username */}
        <button
          onClick={handleLogout}
          style={{
            marginLeft: '10px',
            backgroundColor: '#D9534F',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;