import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logoutUser } from '@services/auth/actions/logout.js';

import styles from './profile-side-bar.module.css';
export default function ProfileSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
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
          <Link onClick={handleLogout}>Выход</Link>
        </li>
      </ul>
      <p className={`${styles.description} text text_type_main-default`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}
