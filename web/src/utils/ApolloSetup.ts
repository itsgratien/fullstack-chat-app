import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { environment } from './Environment';
import { Enum } from './Enum';

const isServer = typeof window === 'undefined';

const httpLink = () => {
  return new HttpLink({
    uri: environment.httpUri,
    credentials: 'include',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZhNmNiZTU5NmVhN2VhYTdlYTU0MjkiLCJpYXQiOjE2NDQ4Mjk3ODEsImV4cCI6MTY0NDkxNjE4MX0.XdVDWTeZP0Oamgr0vLOKkqh5eidDtk5tPMUGWfnEezQ',
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
