import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app/app-header/app-header.jsx';
import { getUserData } from '@services/auth/actions/get-user.js';

export default function AppLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}
