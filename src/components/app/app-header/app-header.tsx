import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { Link, NavLink } from 'react-router-dom';

import type { ReactNode } from 'react';

import styles from './app-header.module.css';

export const AppHeader = (): ReactNode => {
  const linkIconClass = (isActive: boolean): 'primary' | 'secondary' =>
    isActive ? 'primary' : 'secondary';
  const linkTextClass = (isActive: boolean): string =>
    clsx('text text_type_main-default ml-2', isActive && styles.link_active);
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to={`/`} className={styles.link}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={linkIconClass(isActive)} />
                <p className={linkTextClass(isActive)}>Конструктор</p>
              </>
            )}
          </NavLink>
          <NavLink to={`/feed`} className={clsx(styles.link, 'ml-10')}>
            {({ isActive }) => (
              <>
                <ListIcon type={linkIconClass(isActive)} />
                <p className={linkTextClass(isActive)}>Лента заказов</p>
              </>
            )}
          </NavLink>
        </div>
        <Link to={`/`} className={styles.logo}>
          <Logo />
        </Link>
        <NavLink
          to={`/profile`}
          className={clsx(styles.link, styles.link_position_last)}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={linkIconClass(isActive)} />
              <p className={linkTextClass(isActive)}>Личный кабинет</p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
