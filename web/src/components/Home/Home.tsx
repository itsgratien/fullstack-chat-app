import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { Conversation } from './Conversation';
import { Header } from './Header';
import { WriteMessage } from './WriteMessage';
import * as Types from '__generated__';
import { useLazyQuery, useQuery } from '@apollo/client';
import { format } from 'timeago.js';

export const Home = () => {
  const [conversationId, setConversationId] = React.useState<string>();

  const [receiver, setReceiver] = React.useState<Types.TReceiver>();

  const [messages, setMessages] = React.useState<Types.TGetMessage[]>();

  const { data } = useQuery<Types.TGetLoggedInUser>(Types.GET_LOGGED_IN_USER);

  const [getMessageFunc] = useLazyQuery<
    Types.TGetMessageResponse,
    Types.TGetMessageArgs
  >(Types.GET_ALL_MESSAGE_GQL, {
    onCompleted: res => {
      if (res.getMessages && res.getMessages.data) {
        setMessages(res.getMessages.data);
      }
    },
    onError: e => console.log('error-getmessages', e.message),
  });

  const handleChangeConversation = (value?: string) => {
    if (value) {
      setConversationId(value);
      getMessageFunc({ variables: { conversation: value } });
    }
  };

  if (!data || !data.loggedInUser) {
    return null;
  }

  const user = data.loggedInUser;

  return (
    <main
      className={classname(
        'w-full relative h-screen flex relative',
        style.home
      )}
    >
      <Conversation
        setConversationId={handleChangeConversation}
        setReceiver={setReceiver}
      />
      <div className={classname('flex-grow relative', style.rightSide)}>
        <div className={style.divider}>
          <Header />
        </div>
        <div className={style.divider}>
          <div className={classname('relative', style.messages)}>
            {messages && receiver && (
              <>
                {messages.length > 0 && (
                  <ul className={classname(style.messageUl)}>
                    {messages.map((item, itemKey) => (
                      <li
                        key={itemKey}
                        className={classname(
                          'flex flex-col',
                          item.sender._id === user._id
                            ? 'items-end'
                            : 'items-start'
                        )}
                      >
                        <div
                          className={classname(
                            style.listContainer,
                            item.sender._id === user._id
                              ? 'bg-slate-50'
                              : 'bg-neutral-50'
                          )}
                        >
                          <div
                            className={classname(
                              'flex justify-between items-center',
                              style.userDetail
                            )}
                          >
                            <span className="font-bold text-black">
                              {item.sender.username}
                            </span>
                            <small className="text-xs">
                              {format(new Date(item.stamp))}
                            </small>
                          </div>
                          <div className={style.text}>
                            <span>{item.message}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
            {!receiver && (
              <div
                className={classname(
                  'flex items-center justify-center h-full',
                  style.hint
                )}
              >
                <span>Click on your inbox section to preview message</span>
              </div>
            )}
          </div>
          {receiver && (
            <WriteMessage conversation={conversationId} receiver={receiver} username={user.username} />
          )}
        </div>
      </div>
    </main>
  );
};
