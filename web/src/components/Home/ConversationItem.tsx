import React from 'react';
import { TConversationItem } from '__generated__';
import style from './Home.module.scss';
import { format } from 'timeago.js';
import classNames from 'classnames';

interface Props {
  item: TConversationItem;
}

export const ConversationItem = ({ item }: Props) => {
  return (
    <li>
      <div className="flex justify-between">
        <span className={classNames('font-bold', style.username)}>{item.username}</span>
        <span className="text-xs">{format(new Date(item.timestamp))}</span>
      </div>
      <div className={style.message}>
        <span>{item.message}</span>
      </div>
    </li>
  );
};
