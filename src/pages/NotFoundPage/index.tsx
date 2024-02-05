import styles from './styles.module.scss';
import notFound from '../../assets/404.svg';

export const NotFoundPage = () => {
  return (
    <div className={styles.page404}>
      <img src={notFound} alt="404" />
      <div>Sorry, the page you are looking for does not exist.</div>
    </div>
  );
};
