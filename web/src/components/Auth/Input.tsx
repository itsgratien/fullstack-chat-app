import React from 'react';
import classname from 'classnames';
import style from './Auth.module.scss';

type Props = {
  type?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  error?: string;
};

export const Input = ({ type, name, onChange, placeholder, value, error }: Props) => {
  return (
    <div className={classname('w-full flex flex-col justify-center', style.inputGroup)}>
      <input
        type={type || 'text'}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        className={classname('outline-none focus:outline-none', style.input)}
      />
      {error && <small className='text-red-600 text-xs'>{ error }</small>}
    </div>
  );
};
