import classNames from 'classnames';

import error from '../../assets/error.svg';
import success from '../../assets/success.svg';

import styles from './styles.module.scss';

type NotificationProps = {
  message: string;
  kind: 'success' | 'error';
};

export const Notification = ({
  message,
  kind = 'success',
}: NotificationProps) => {
  const notificationIcon = kind === 'success' ? success : error;

  return (
    <div
      className={classNames(
        styles.notification,
        kind === 'success' ? styles.success : styles.error,
      )}>
      <img
        className={styles.notificationIcon}
        src={notificationIcon}
        alt="kind"
      />
      <p>{message}</p>
    </div>
  );
};
