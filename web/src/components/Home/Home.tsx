import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { Conversation } from './Conversation';

export const Home = () => {
  return (
    <main className={classname('relative w-full h-screen flex', style.home)}>
      <Conversation />
    </main>
  );
};
