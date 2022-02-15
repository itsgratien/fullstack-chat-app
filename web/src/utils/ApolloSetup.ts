import { ApolloClient, InMemoryCache, HttpLink, makeVar } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { environment } from './Environment';
import { Enum } from './Enum';
import * as Types from '__generated__';

const isServer = typeof window === 'undefined';

export const loggedInUserVar = makeVar<Types.TUser | undefined>(undefined);

const httpLink = () => {
  return new HttpLink({
    uri: environment.httpUri,
    credentials: 'include',
    headers: {
      Authorization: isServer ? '' : localStorage.getItem(Enum.token),
    },
  });
};

const wsLink = () =>
  new WebSocketLink({
    uri: environment.webSocketUri,
    options: { reconnect: true },
  });

export const apolloClient = () => {
  const ssrMode = isServer;
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            loggedInUser: {
              read: () => {
                return loggedInUserVar();
              },
            },
          },
        },
      },
    }),
    link: ssrMode ? httpLink() : wsLink(),
    ssrMode,
  });
};
