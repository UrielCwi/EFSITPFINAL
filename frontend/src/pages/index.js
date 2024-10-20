import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import { UserContext } from '../app/context/AuthContext';

const IndexPage = () => {
  const { token } = useContext(UserContext);
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
