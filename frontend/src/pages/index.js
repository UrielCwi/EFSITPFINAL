import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const IndexPage = () => {
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (token) {
      router.push('/home');  // Redirige a /home si existe el token
    } else {
      router.push('/login'); // Redirige a /login si no hay token
    }
  }, [token, router]);

  return null; // No mostrar nada en la página, solo hacer la redirección
};

export default IndexPage;
