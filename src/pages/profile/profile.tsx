import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Outlet } from 'react-router-dom';

import ProfileSideBar from '@components/profile/profile-side-bar/profile-side-bar.tsx';
import { useAppSelector } from '@hooks/useAppSelector.ts';
import { isAuthLoading } from '@services/auth/auth-slice.ts';

import type { ReactNode } from 'react';

import styles from './profile.module.css';

export default function Profile(): ReactNode {
  const loading = useAppSelector(isAuthLoading);

  return (
    <div className={styles.profile}>
      <ProfileSideBar />
      {loading ? <Preloader /> : <Outlet />}
    </div>
  );
}
