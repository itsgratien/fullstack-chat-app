import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { Conversation } from './Conversation';
import { Header } from './Header';

export const Home = () => {
  return (
    <main className={classname('w-full h-screen flex', style.home)}>
      <Conversation />
      <div className={classname('flex-grow relative', style.rightSide)}>
              <Header />
              <div></div>
      </div>
    </main>
  );
};
