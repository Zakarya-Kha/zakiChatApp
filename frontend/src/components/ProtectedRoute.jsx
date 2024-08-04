import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component }) => {
  const { authUser } = useSelector((store) => store.user);

  return authUser ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
