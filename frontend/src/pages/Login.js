import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5432/api/user/login', {
        username,
        password,
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.token);
      }
      router.push('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
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
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <p className={styles.registerPrompt}>
        ¿No tienes una cuenta? <span className={styles.registerLink} onClick={handleRegisterRedirect}>Regístrate aquí</span>
      </p>
    </div>
  );
};

export default Login;
