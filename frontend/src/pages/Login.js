// pages/Login.js
import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Footer from '@/app/components/Footer';
import { AuthContext } from '@/app/context/AuthContext'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { username, password });
      login(response.data.token, response.data.username);
      router.push('/Home');
    } catch (error) {
      console.error('Error de login:', error);
      alert('Error al iniciar sesión. Por favor, revisa tus credenciales.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Iniciar Sesión</button>
      </form>
      <p className={styles.registerPrompt}>
        ¿No tienes cuenta? <span className={styles.registerLink} onClick={() => router.push('/Register')}>Regístrate aquí</span>
      </p>
      <Footer />
    </div>
  );
};

export default Login;
