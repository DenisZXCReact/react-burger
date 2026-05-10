import { NavLink, useNavigate } from 'react-router-dom';

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
        <li className={`${styles.item} text text_type_main-medium`}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${styles.item} text text_type_main-medium`}>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            История заказов
          </NavLink>
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
