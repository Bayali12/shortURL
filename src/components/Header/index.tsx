import { useAppDispatch } from '../../hooks';
import { logout } from '../../redux/slices/auth';
import logo from '../../assets/logo.svg';

import styles from './styles.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();

  const onClikcLogout = () => {
    dispatch(logout());
    localStorage.removeItem('access_token');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="logo" />
        Short URL
      </div>

      <button onClick={onClikcLogout} className={styles.logout}>
        Log Out
      </button>
    </header>
  );
};
