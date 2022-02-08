import React from 'react';
import style from './Home.module.scss';
import classname from 'classnames';
import { PowerOutline } from 'react-ionicons';

export const Header = () => {
  return (
    <div className={classname(style.header, 'absolute top-0 left-0 right-0 w-full flex items-center')}>
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
