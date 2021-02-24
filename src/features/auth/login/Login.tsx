import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { useHasError } from 'common/hooks/useHasError'

import { login } from 'features/auth/authSlice'

import styles from './Login.module.scss'


interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm<LoginForm>();
  const { error } = useHasError(login.name);

  const onSubmit = async ({ email, password }: LoginForm) => {
    dispatch(login(email, password));
  };

  const isRequired = (value: string) => !!value || "Email is required.";

  return (
    <div className={styles.login_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Login</h3>

        <input
          name="email"
          ref={register({
            validate: {
              isRequired: isRequired,
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address.",
            },
          })}
          placeholder="Email"
          // type="email"
        />

        <input
          name="password"
          ref={register({ required: true })}
          type="password"
          placeholder="Password"
        />

        <div>
          <input className={styles.login_btn} type="submit" />
        </div>

        <div className={styles.login_error}>
          <p>{error}</p>
          <p>{errors.email && errors.email.message}</p>
          <p>{errors.password && "Password is required."}</p>
        </div>
      </form>
    </div>
  );
};
