import React from 'react';
import classname from 'classnames';
import style from './Auth.module.scss';

interface Props{
    type?: 'button' | 'submit' | 'reset';
    name: string;
}

export const Button = ({type, name}: Props) => {
    return (
      <div>
        <button
          type={type || 'button'}
          className={classname(
            'outline-none focus:outline-none bg-primary text-white ml-3 font-bold',
            style.button
          )}
        >
          {name}
        </button>
      </div>
    );
};
