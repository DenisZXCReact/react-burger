import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getAuthUser, isAuthChecked } from '@services/auth/auth-slice.js';

export default function ProtectedRoute({ onlyUnAuth = false, component }) {
  const isAuthenticated = useSelector(isAuthChecked);
  const user = useSelector(getAuthUser);
  const location = useLocation();

  if (!isAuthenticated) return null;

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return component;
}
