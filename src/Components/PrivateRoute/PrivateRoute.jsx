import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    console.log('firebase loading');
    return;
  }
  if (!user) {
    swal('Login required!', '', 'error');
    return <Navigate to={'/login'} replace={true} state={'Login'} />;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
