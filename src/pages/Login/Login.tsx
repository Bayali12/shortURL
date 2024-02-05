import { Link, Navigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UserCredentials } from '../../shared/types';
import { fetchLogin } from '../../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../../hooks';
import logo from '../../assets/logo.svg';

import styles from './styles.module.scss';

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const {
    register,
    handleSubmit,
  } = useForm<UserCredentials>();

  const onSubmit: SubmitHandler<UserCredentials> = (values) => {
    dispatch(fetchLogin(values));
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

        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.inputField}
            placeholder="Username"
            {...register('username', { required: 'Enter your username' })}
          />
          <input
            type="password"
            className={styles.inputField}
            placeholder="Password"
            {...register('password', { required: 'Enter your password' })}
          />

          <button type="submit" className={styles.authBtn}>
            Log in
          </button>
        </form>

        <div className={styles.redirectLink}>
          <span>Don't have an account? </span>
          <Link to="/register">Signup</Link>
        </div>
      </div>
    </div>
  );
};
