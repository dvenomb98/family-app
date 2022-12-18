import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/');
  }, [user]);

  return children;
};

export default ProtectedRoute;
