import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles.module.scss';

export const Navigation = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className={styles.navigation}>
      <Link
        to={'/'}
        className={classNames(styles.link, {
          [styles.active]: currentPage === '/',
        })}>
        New Link
      </Link>
      <Link
        to={'/links'}
        className={classNames(styles.link, {
          [styles.active]: currentPage === '/links',
        })}>
        My Links
      </Link>
    </div>
  );
};
