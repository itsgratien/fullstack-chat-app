import React from 'react';
import classNames from 'classnames';
import { Login, Signup } from '.';
import style from './Auth.module.scss';

export const Auth = () => {
    return (
        <div className={classNames('flex', style.auth)}>
          <Login />
          <Signup />
        </div>
    );
};
