import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { Conversation } from './Conversation';
import { Header } from './Header';
import { WriteMessage } from './WriteMessage';

export const Home = () => {
  const [conversationId, setConversationId] = React.useState<string>();

  return (
    <main
      className={classname(
        'w-full relative h-screen flex relative',
        style.home
      )}
    >
      <Conversation setConversationId={setConversationId} />
      <div className={classname('flex-grow relative', style.rightSide)}>
        <div className={style.divider}>
          <Header />
        </div>
        <div className={style.divider}>
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
          <WriteMessage
            conversation={conversationId}
          />
        </div>
      </div>
    </main>
  );
};
