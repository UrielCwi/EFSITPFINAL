import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../app/context/AuthContext';

const IndexPage = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push('/Home');
    } else {
      router.push('/Login');
    }
  }, [token, router]);

  return null;
};

export default IndexPage;
