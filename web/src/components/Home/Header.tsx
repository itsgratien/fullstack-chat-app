import React from 'react';
import style from './Home.module.scss';
import classname from 'classnames';
import { PowerOutline } from 'react-ionicons';

export const Header = () => {
  return (
    <div className={classname(style.header, 'w-full flex items-center justify-between')}>
      <div className={classname('flex items-center')}>
        <div>
          <img src="/hand.png" alt="hand" />
        </div>
        <div className={style.greeting}>
          <span>Hello</span>
          <span className="ml-2">johndoe</span>
        </div>
      </div>
      <div className={style.logout}>
        <button
          type="button"
          className={classname(
            'outline-none focus:outline-none flex items-center'
          )}
        >
          <span className="font-bold">Logout</span>
          <span className='ml-2'>
            <PowerOutline />
          </span>
        </button>
      </div>
    </div>
  );
};
