import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import EventList from '@/app/components/EventList';

const Home = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');

      if (!token) {
        router.push('/login');
      } else {
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Bienvenido a la Home</h1>
      {username && <h2>Hola, {username}!</h2>}
      <EventList />
      <Footer />
    </div>
  );
};

export default Home;
