import { useAppDispatch } from '../../../hooks';
import { copyToClipBoard } from '../../../redux/slices/links';
import { ColumnProps, Link } from '../../../shared/types';
import { REDIRECT_URL } from '../../../shared/constants';
import copy from '../../../assets/copy.svg';

import styles from './styles.module.scss';

export const columns: Array<ColumnProps<Link>> = [
  {
    key: 'id',
    title: 'Id',
  },
  {
    key: 'short',
    title: 'Short',
    sortable: true,
    render: (_, record) => {
      return (
        <>
          <a
            target="_blank"
            className={styles.link}
            href={REDIRECT_URL + record.short}>
            {REDIRECT_URL + record.short}
          </a>
        </>
      );
    },
  },
  {
    key: 'target',
    title: 'Target',
    sortable: true,
    render: (_, record) => {
      return (
        <a
          href={record.target}
          className={styles.link}
          target="_blank"
          style={{
            display: 'block',
            maxWidth: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordWrap: 'break-word',
          }}>
          {record.target}
        </a>
      );
    },
  },
  {
    key: 'counter',
    title: 'Counter',
    sortable: true,
  },
  {
    key: 'action' as keyof Link,
    title: 'Copy',
    render: (_, record) => {
      const dispatch = useAppDispatch();

      return (
        <div className={styles.action}>
          <button
            onClick={() =>
              dispatch(copyToClipBoard(REDIRECT_URL + record.short))
            }>
            <img src={copy} alt="copyIcon" />
          </button>
        </div>
      );
    },
  },
];
