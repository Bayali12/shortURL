import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Notification } from '../Notification';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeNotification } from '../../redux/slices/notifications';

import styles from './styles.module.scss';

export const Notifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notification.notifications,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        dispatch(removeNotification());
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [notifications]);

  return ReactDOM.createPortal(
    <div className={styles.notifications}>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          message={notification.message}
          kind={notification.kind}
        />
      ))}
    </div>,
    document.getElementById('root')!,
  );
};
