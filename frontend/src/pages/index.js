import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const IndexPage = () => {
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (token) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [token, router]);

  return null;
};

export default IndexPage;
