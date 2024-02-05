import { Link, Navigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UserCredentials } from '../../shared/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchRegister } from '../../redux/slices/auth';
import logo from '../../assets/logo.svg';

import styles from './styles.module.scss';

export const Register = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCredentials>();

  const onSubmit: SubmitHandler<UserCredentials> = (values) => {
    dispatch(fetchRegister(values));
    reset();
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.authForm}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="logo" />
          Short URL
        </div>

        <h2>Let's get started!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.inputField}
            placeholder="Username"
            required
            {...register('username')}
          />
          <input
            type="password"
            className={styles.inputField}
            placeholder="Password"
            required
            {...register('password')}
          />

          <button type="submit" className={styles.authBtn}>
            Sign Up
          </button>
        </form>

        <div className={styles.redirectLink}>
          <span>Already a user? </span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};
