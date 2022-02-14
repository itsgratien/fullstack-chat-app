import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { Conversation } from './Conversation';
import { Header } from './Header';
import { WriteMessage } from './WriteMessage';
import * as Types from '__generated__';

interface Props{
  conversations?: Types.TGetConversation[]
}
export const Home = ({ conversations }: Props) => {
  return (
    <main className={classname('w-full h-screen flex', style.home)}>
      <Conversation conversations={conversations} />
      <div className={classname('flex-grow relative', style.rightSide)}>
        <Header />
        <div className={classname('relative', style.messages)}>
          <div
            className={classname(
              'flex items-center justify-center h-full',
              style.hint
            )}
          >
            <span>Click on your inbox section to preview message</span>
          </div>
        </div>
        <WriteMessage />
      </div>
    </main>
  );
};
