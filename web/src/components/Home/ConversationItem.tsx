import React from 'react';
import { TConversationItem } from '__generated__';
import style from './Home.module.scss';
import { format } from 'timeago.js';
import classNames from 'classnames';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';

interface Props {
  item: TConversationItem;
  handleClick: (conversationId?: string) => void;
}

export const ConversationItem = ({ item, handleClick }: Props) => {
  const { data } = useQuery<Types.TGetLoggedInUser>(Types.GET_LOGGED_IN_USER);

  if (!data || !data.loggedInUser) {
    return null;
  }

  const isCurrentUser = item.senderId === data.loggedInUser._id;

  return (
    <li onClick={() => handleClick(item.conversationId)}>
      <div className="flex justify-between">
        <span className={classNames('font-bold', style.username)}>
          {item.username}
        </span>
        {item.timestamp && (
          <span className="text-xs">{format(new Date(item.timestamp))}</span>
        )}
      </div>
      <div className={classNames('relative', style.message)}>
        <span>{item.message}</span>
        {isCurrentUser && (
          <small style={{ fontSize: '8px' }} className="absolute top-0 right-0">
            (You)
          </small>
        )}
      </div>
    </li>
  );
};
