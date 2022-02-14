import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { SearchOutline as SearchIcon } from 'react-ionicons';
import { ConversationItem } from './ConversationItem';
import * as Types from '__generated__';
interface Props {
  conversations?: Types.TGetConversation[];
}
export const Conversation = ({ conversations }: Props) => {
  return (
    <div
      className={classname('fixed top-0 bottom-0 bg-white', style.conversation)}
    >
      <div
        className={classname('flex justify-between items-center', style.search)}
      >
        <input
          type="text"
          name="search"
          placeholder="search user"
          className="outline-none focus:outline-none flex-grow"
        />
        <button
          type="button"
          className="outline-none focus-outline-none flex items-center justify-center"
        >
          <SearchIcon />
        </button>
      </div>
      <div className={style.ulConversation}>
        {conversations && conversations.length > 0 && (
          <ul>
            {conversations.map((item, index) => (
              <ConversationItem
                item={{
                  username: item.sender.username || '',
                  conversationId: item._id,
                  message: item.latestMessage.message,
                  timestamp: Number(item.latestMessage.timestamp),
                }}
                key={index}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
