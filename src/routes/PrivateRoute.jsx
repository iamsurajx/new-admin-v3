import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/admin/login" />}
    />
  );
};

export default PrivateRoute;
