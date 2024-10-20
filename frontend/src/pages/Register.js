// src/app/Register.js
import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css';
import Footer from '@/app/components/Footer';
import { AuthContext } from '@/app/context/AuthContext'; // Cambié a AuthContext

const Register = () => {
  const { login } = useContext(AuthContext); // Usar el contexto de autenticación
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/register/', {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
      });
      const token = response.data.token;
      login(token, username); // Guardar token y username en el contexto
      router.push('/Home');
    } catch (error) {
      console.error('Error en el registro', error);
      alert('Error en el registro'); // Agregado para manejar el error visualmente
    }
  };

  const handleLoginRedirect = () => {
    router.push('/Login');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h2 className={styles.title}>Registro</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={styles.input}
          required
        />
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
        <button type="submit" className={styles.button}>Registrar</button>
      </form>
      <p className={styles.loginPrompt}>
        ¿Ya tienes una cuenta? <span className={styles.loginLink} onClick={handleLoginRedirect}>Inicia sesión aquí</span>
      </p>
      <Footer />
    </div>
  );
};

export default Register;
