import React from 'react';
import classname from 'classnames';
import style from './Auth.module.scss';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  name: string;
  loading?: boolean;
}

export const Button = ({ type, name, loading }: Props) => {
  return (
    <div>
      <button
        type={type || 'button'}
        className={classname(
          'outline-none focus:outline-none bg-primary text-white ml-3 font-bold',
          loading ? 'opacity-75' : 'opacity-100',
          style.button
        )}
        disabled={loading}
      >
        {name}
      </button>
    </div>
  );
};
