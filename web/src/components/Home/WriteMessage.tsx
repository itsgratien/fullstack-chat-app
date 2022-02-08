import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { PaperPlaneOutline } from 'react-ionicons';

export const WriteMessage = () => {
  return (
    <div className={classname('flex items-center w-full', style.writeMessage)}>
      <textarea
        name=""
        placeholder="write message"
        className={classname(
          'outline-none focus:outline-none w-full',
          style.textarea
        )}
      ></textarea>
      <button
        type="button"
        className={classname(
          'outline-none focus:outline-none bg-primary rounded-full flex items-center justify-center'
        )}
      >
        <PaperPlaneOutline color={'white'} />
      </button>
    </div>
  );
};
