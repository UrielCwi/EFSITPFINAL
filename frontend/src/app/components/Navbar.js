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
    localStorage.removeItem('username');
    router.push('/login');
  };

  const handleRedirectToHome = () => {
    router.push('/home');
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
        <span>{username || 'Invitado'}</span>
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