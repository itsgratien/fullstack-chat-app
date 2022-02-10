import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { environment } from './Environment';
import { Enum } from './Enum';

const isServer = typeof window === 'undefined';
const httpLink = () => {
  return createHttpLink({
    uri: environment.httpUri,
    credentials: 'include',
    headers: {
      Authorization: ''
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
    cache: new InMemoryCache(),
    link: ssrMode ? httpLink() : wsLink(),
    ssrMode,
  });
};
