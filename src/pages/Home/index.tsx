import { ShortLink } from '../../components/ShortLink';
import { ShortLinkForm } from '../../components/ShortLinkForm';
import { useAppSelector } from '../../hooks';

import styles from './styles.module.scss';

export const Home = () => {
  const link = useAppSelector((state) => state.links.link);

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Create Short URLs</h1>
      <p className={styles.description}>
        <span className={styles.highlight}>Short URL</span> - is the Link
        Shortener service to track and share short URLs.
      </p>
      <ShortLinkForm />
      {link && <ShortLink short={link.short} target={link.target} />}
    </div>
  );
};
