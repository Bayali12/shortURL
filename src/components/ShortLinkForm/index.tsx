import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../hooks';
import { fetchSqueezeLink } from '../../redux/slices/links';

import styles from './styles.module.scss';

export const ShortLinkForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ link: string }>();

  const onSubmit: SubmitHandler<{ link: string }> = ({ link }) => {
    dispatch(fetchSqueezeLink(link));
    reset();
  };

  return (
    <div className={styles.formmWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Enter a link to shorten it"
          type="text"
          {...register('link', {
            required: 'Link required field',
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
              message: 'Incorrect link format',
            },
          })}
        />
        <button type="submit" className={styles.button}>
          Shorten URL
        </button>
        {errors.link && (
          <p className={styles.error}>{`* ${errors.link.message}`}</p>
        )}
      </form>
    </div>
  );
};
