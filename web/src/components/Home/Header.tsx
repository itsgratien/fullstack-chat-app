import React from 'react';
import style from './Home.module.scss';
import classname from 'classnames';
import { PowerOutline } from 'react-ionicons';
import * as Types from '__generated__';
import { apolloClient, Enum } from 'utils';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

export const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    apolloClient.cache.gc();
    localStorage.removeItem(Enum.Token);
    router.push('/');
  };

  const { data } = useQuery<Types.TGetLoggedInUser>(Types.GET_LOGGED_IN_USER);

  if (!data || !data.loggedInUser) {
    return null;
  }

  return (
    <div
      className={classname(
        style.header,
        'relative flex justify-between items-center'
      )}
    >
      <div className={classname('relative flex items-center')}>
        <div className={style.hand}>
          <img src="/hand.png" alt="hand" />
        </div>
        <div className={style.greeting}>
          <span>Hello</span>
          <span className="ml-2">{data.loggedInUser.username}</span>
        </div>
      </div>
      <div className={style.logout}>
        <button
          type="button"
          className={classname(
            'outline-none focus:outline-none flex items-center'
          )}
          onClick={handleLogout}
        >
          <span className="font-bold">Logout</span>
          <span className="ml-2">
            <PowerOutline />
          </span>
        </button>
      </div>
    </div>
  );
};
