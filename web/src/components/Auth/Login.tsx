import React from 'react';
import classname from 'classnames';
import style from './Auth.module.scss';
import { Input } from './Input';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Title } from './Title';
import { Button } from './Button';

const loginSchema = object().shape({
  username: string().required('username is required'),
  password: string().required('password is required'),
});

export const Login = () => {
  const formik = useFormik({
    validationSchema: loginSchema,
    validateOnChange: false,
    onSubmit: values => {
      console.log(values);
    },
    initialValues: { username: '', password: '' },
  });

  return (
    <div className={classname('relative flex-grow', style.authGroup)}>
      <Title title="Signin" />
      <div className={classname(style.authForm)}>
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
          <div className="flex items-center">
            <Input
              name="username"
              placeholder="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
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
          <Button name="login" type="submit" />
        </form>
      </div>
    </div>
  );
};
