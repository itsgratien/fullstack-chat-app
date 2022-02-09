import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { environment } from './Environment';
import { Enum } from './Enum';

const httpLink = ()=> new HttpLink({
  uri: environment.httpUri,
  headers: {
    Authorization: typeof window !== 'undefined' ? localStorage.getItem(Enum.token): ''
  }
});

const wsLink = () =>
  new WebSocketLink({
    uri: environment.webSocketUri,
    options: { reconnect: true },
  });

export const apolloClient = () => {
  const ssrMode = typeof window === 'undefined';
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ssrMode ? httpLink() : wsLink(),
    ssrMode,
  });
};
