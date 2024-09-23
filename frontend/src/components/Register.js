import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Register.css';  // Importar el CSS separado

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5432/api/user/register/', {
        first_name: firstName,
        last_name: lastName,
        username,
        password,
      });

      const token = response.data.token; // El token incluye ID y username
      localStorage.setItem('token', token);

      // Redirigir al home después de registrarse
      router.push('/home');
    } catch (error) {
      console.error('Error en el registro', error);
    }
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
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Registrar</button>
      </form>
    </div>
  );
};

export default Register;
