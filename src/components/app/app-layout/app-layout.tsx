import { type ReactNode, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app/app-header/app-header.tsx';
import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import { getUserData } from '@services/auth/actions/get-user.ts';

export default function AppLayout(): ReactNode {
  const dispatch = useAppDispatch();

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
