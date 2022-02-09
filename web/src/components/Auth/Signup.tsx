import React from 'react';
import classname from 'classnames';
import style from './Auth.module.scss';
import { Input } from './Input';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Title } from './Title';
import { Button } from './Button';
import * as Types from '__generated__';
import { useMutation } from '@apollo/client';

const signupSchema = object().shape({
  username: string().required('username is required'),
  password: string().required('password is required'),
  email: string().required('email is required').email('email must be valid'),
});

export const Signup = () => {
  const [error, setError] = React.useState<string>();

  const [message, setMessage] = React.useState<string>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [createAccount, res] = useMutation<
    Types.TSignupResponse,
    Types.TSignupVariables
  >(Types.SIGNUP_MUTATION, {
    onCompleted: res => {
      if (res && res.createAccount) {
        setMessage(res.createAccount.message);
        setLoading(false);
        setError(undefined);
      }
    },
    onError: e => {
      setError(e.message);
      setLoading(false);
      setMessage(undefined);
    },
  });

  const formik = useFormik({
    validationSchema: signupSchema,
    validateOnChange: false,
    onSubmit: values => {
      createAccount({ variables: values });
    },
    initialValues: { username: '', password: '', email: '' },
  });

  const { resetForm } = formik;

  React.useEffect(() => {
    if (res.loading) setLoading(res.loading);
  }, [res.loading]);

  React.useEffect(() => {
    if (res.data && res.data.createAccount) {
      resetForm();
    }
  }, [res.data, resetForm]);

  return (
    <div className={classname('relative flex-grow', style.authGroup)}>
      <Title title="Signup" />
      <div className={classname(style.authForm)}>
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
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
          {error && (
            <small className="text-red-600 text-xs ml-3 font-bold">
              {error}
            </small>
          )}
          {message && (
            <small className="text-green-600 text-xs ml-3 font-bold">
              {message}
            </small>
          )}
          <Button name="signup" type="submit" loading={loading} />
        </form>
      </div>
    </div>
  );
};
