import React from 'react';
import classname from 'classnames';
import style from './Auth.module.scss';
import { Input } from './Input';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Title } from './Title';
import { Button } from './Button';

const signupSchema = object().shape({
  username: string().required('username is required'),
  password: string().required('password is required'),
  email: string().required('email is required').email('email must be valid'),
});

export const Signup = () => {
  const formik = useFormik({
    validationSchema: signupSchema,
    validateOnChange: false,
    onSubmit: values => {
      console.log(values);
    },
    initialValues: { username: '', password: '', email: '' },
  });

  return (
    <div className={classname('relative flex-grow', style.authGroup)}>
      <Title title="Signup" />
      <div className={classname(style.authForm)}>
        <form onSubmit={formik.handleSubmit}>
          <div
            className={classname(
              'flex items-center flex-wrap w-full',
              style.divider
            )}
          >
            <Input
              name="username"
              placeholder="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
            />
            <Input
              name="email"
              placeholder="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <Input
              name="password"
              placeholder="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              error={formik.errors.password}
            />
          </div>
          <Button name="signup" type="submit" />
        </form>
      </div>
    </div>
  );
};
