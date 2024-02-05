import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Navigation } from '../Navigation';

import styles from './styles.module.scss';

export const Layout = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};
