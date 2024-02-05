import { FC } from 'react';

import { useAppDispatch } from '../../hooks';
import { REDIRECT_URL } from '../../shared/constants';
import { copyToClipBoard } from '../../redux/slices/links';
import { Link } from '../../shared/types';
import copy from '../../assets/copy.svg';

import styles from './styles.module.scss';

export const ShortLink: FC<Pick<Link, 'short' | 'target'>> = ({
  short = 'sfasfaf',
  target = 'fasfsafaf',
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (copyText: string) => {
    dispatch(copyToClipBoard(copyText));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.shortLink}>
        <a href={REDIRECT_URL + short}>{REDIRECT_URL + short}</a>
        <button
          className={styles.copyBtn}
          onClick={() => handleClick(REDIRECT_URL + short)}>
          <img src={copy} alt="copyIcon" />
          Copy Link
        </button>
      </div>
      <p className={styles.targetLink}>{target}</p>
    </div>
  );
};
