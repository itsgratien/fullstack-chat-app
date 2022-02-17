import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { SearchOutline as SearchIcon } from 'react-ionicons';
import { ConversationItem } from './ConversationItem';
import * as Types from '__generated__';
import { useMutation, useQuery } from '@apollo/client';
interface Props {
  setConversationId: (value: string) => void;
}
export const Conversation = ({ setConversationId }: Props) => {
  const [conversations, setConversations] =
    React.useState<Types.TGetAllConversation[]>();

  const [searchValue, setSearchValue] = React.useState<string>();

  const { data } = useQuery<Types.TGetConversationResponse>(
    Types.GET_ALL_CONVERSATION
  );

  const [searchUserFunc] = useMutation<
    Types.TSearchUserResponse,
    Types.TSearchUserArgs
    >(Types.SEARCH_USER_GQL, {
      onCompleted: (res) => {
        setConversations(res.searchUser.data);
      },
      onError: (e) => {
        console.log('search error:', e.message)
      }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value !== '') {
      searchUserFunc({ variables: { user: e.target.value } });
    } else {
      setConversations(data?.getConversations.data || []);
    }
  };

  React.useEffect(() => {
    setConversations(data?.getConversations.data || []);
  }, [data]);

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
          onChange={handleSearch}
          value={searchValue}
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
                  username: item.user.username || '',
                  conversationId: item.conversation && item.conversation._id,
                  message: item.conversation && item.conversation.latestMessage.message,
                  timestamp: item.conversation && Number(item.conversation.latestMessage.timestamp),
                  senderId: item.conversation && item.conversation.sender._id,
                }}
                key={index}
                handleClick={setConversationId}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
