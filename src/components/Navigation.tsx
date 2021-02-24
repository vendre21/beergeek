import React, { FC, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { logout } from 'features/auth/authSlice'
import { useAuthentication } from 'features/auth/useAuthentication'

import styles from './Layout.module.scss'


export const Navigation: FC = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, userName } = useAuthentication();

  const userSection = useMemo(() => {
    return isAuthenticated ? userName : "";
  }, [isAuthenticated, userName]);

  return (
    <nav className={styles.nav}>
      <p className={styles.username}>{userSection}</p>
      <ul>
        <li>
          {isAuthenticated && (
            <span
              className={styles.logout_btn}
              onClick={() => dispatch(logout())}
            >
              Logout
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};
