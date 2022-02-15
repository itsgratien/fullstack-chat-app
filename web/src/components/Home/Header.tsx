import React from 'react';
import style from './Home.module.scss';
import classname from 'classnames';
import { PowerOutline } from 'react-ionicons';
import { useQuery } from '@apollo/client';
import * as Types from '__generated__';
import { loggedInUserVar, apolloClient, Enum } from 'utils';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();

  const { data } = useQuery<Types.TGetLoggedInUser>(
    Types.GET_LOGGED_IN_USER
  );

  const handleLogout = () => { 
    loggedInUserVar(undefined);
    apolloClient().cache.gc();
    localStorage.removeItem(Enum.token);
    router.push('/');
  }
  
  if (!data || !data.loggedInUser) {
    return null;
  }

  return (
    <div
      className={classname(
        style.header,
        'w-full flex items-center justify-between'
      )}
    >
      <div className={classname('flex items-center')}>
        <div>
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
