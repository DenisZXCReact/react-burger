import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@hooks/useAppSelector.ts';
import { getAuthUser, isAuthChecked } from '@services/auth/auth-slice.ts';

import type { ReactNode } from 'react';

export default function ProtectedRoute({
  onlyUnAuth = false,
  component,
}: {
  onlyUnAuth?: boolean;
  component?: ReactNode;
}): ReactNode {
  const isAuthenticated = useAppSelector(isAuthChecked);
  const user = useAppSelector(getAuthUser);
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
