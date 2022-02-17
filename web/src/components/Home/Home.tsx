import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { Conversation } from './Conversation';
import { Header } from './Header';
import { WriteMessage } from './WriteMessage';
import * as Types from '__generated__';
import { useQuery } from '@apollo/client';

export const Home = () => {
  const [conversationId, setConversationId] = React.useState<string>();

  const [receiverId, setReceiverId] = React.useState<string>();

  const { data } = useQuery<Types.TGetConversationResponse>(
    Types.GET_ALL_CONVERSATION
  );
  
  return (
    <main
      className={classname(
        'w-full relative h-screen flex relative',
        style.home
      )}
    >
      <Conversation conversations={data?.getConversations.data} />
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
            receiver={receiverId || ''}
            conversation={conversationId}
          />
        </div>
      </div>
    </main>
  );
};
