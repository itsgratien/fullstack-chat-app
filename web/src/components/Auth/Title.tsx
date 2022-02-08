import React from 'react';
import style from './Auth.module.scss';
import classname from 'classnames';

interface Props {
  title: string;
}
export const Title = ({ title }: Props) => {
  return (
    <div className={classname('ml-3', style.title)}>
      <span className="font-bold text-black">{title}</span>
    </div>
  );
};
