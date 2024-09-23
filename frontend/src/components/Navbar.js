import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';  // Importar el CSS separado

const Navbar = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { username } = JSON.parse(atob(token.split('.')[1]));
      setUsername(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        <span className={styles.logoText}>Mi Sitio</span>
      </div>
      <ul className={styles.navLinks}>
        <li><a href="/home">Home</a></li>
        <li><a href="/eventos">Eventos</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
      <div className={styles.userSection}>
        {username ? (
          <>
            <span className={styles.username}>{username}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <a href="/login" className={styles.loginLink}>Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
