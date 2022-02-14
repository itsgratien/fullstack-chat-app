import React from 'react';
import { useMutation } from '@apollo/client';
import classname from 'classnames';
import style from './Auth.module.scss';
import { Input } from './Input';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Title } from './Title';
import { Button } from './Button';
import * as Types from '__generated__';
import { Enum } from 'utils';
import { useRouter } from 'next/router';

const loginSchema = object().shape({
  username: string().required('username is required'),
  password: string().required('password is required'),
});

export const Login = () => {
  const [error, setError] = React.useState<string>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const [login, res] = useMutation<Types.TLoginResponse, Types.TLoginArgs>(
    Types.LOGIN_MUTATION,
    {
      onCompleted: async res => {
        if (res && res.login) {
          const set = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(res.login),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          await set.json();
          console.log('res', res.login.token);
          router.push('/home');
        }
      },
      onError: e => {
        setError(e.message);
        setLoading(false);
      },
    }
  );

  const formik = useFormik({
    validationSchema: loginSchema,
    validateOnChange: false,
    onSubmit: values => {
      login({ variables: values });
    },
    initialValues: { username: '', password: '' },
  });

  React.useEffect(() => {
    if (res.loading) setLoading(res.loading);
  }, [res.loading]);

  return (
    <div className={classname('relative flex-grow', style.authGroup)}>
      <Title title="Signin" />
      <div className={classname(style.authForm)}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
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
          {error && (
            <small className="text-red-600 text-xs ml-3 font-bold">
              {error}
            </small>
          )}
          <Button name="login" type="submit" loading={loading} />
        </form>
      </div>
    </div>
  );
};
