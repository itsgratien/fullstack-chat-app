import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';

export const Conversation = () => {
    return <div className={classname('fixed top-0 bottom-0 bg-white', style.conversation)}>
        <div className={classname('flex justify-between items-center', style.search)}>
            <input type="text" name='search' placeholder='search user' className='outline-none focus:outline-none flex-grow' />
            <button type='button' className='outline-none focus-outline-none'></button>
      </div>
  </div>;
};
