import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@hooks/useAppDispatch.ts';
import { logoutUser } from '@services/auth/actions/logout.ts';

import type { ReactNode } from 'react';

import styles from './profile-side-bar.module.css';
export default function ProfileSideBar(): ReactNode {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async (): Promise<void> => {
    await dispatch(logoutUser());
    navigate('/login');
  };
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        <li className={`${styles.item} ${styles.active} text text_type_main-medium`}>
          <Link to="/profile">Профиль</Link>
        </li>
        <li className={`${styles.item} text text_type_main-medium`}>
          <Link to="/profile/orders">История заказов</Link>
        </li>
        <li className={`${styles.item} text text_type_main-medium`}>
          <a onClick={handleLogout}>Выход</a>
        </li>
      </ul>
      <p className={`${styles.description} text text_type_main-default`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}
