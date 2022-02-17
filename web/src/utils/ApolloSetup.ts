import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { Enum } from './Enum';
import fetch from 'isomorphic-unfetch';

const isServer = typeof window === 'undefined';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  headers: {
    Authorization: isServer ? '' : localStorage.getItem(Enum.Token),
  },
  fetch,
});

const wsLink = () =>
  new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: localStorage.getItem(Enum.Token),
        },
      },
    },
  });

export const splitLink = !isServer ? wsLink() : httpLink;

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          loggedInUser: {
            read: () => {
              const user = !isServer
                ? localStorage.getItem(Enum.LoggedInUser)
                : null;
              return user ? JSON.parse(user) : null;
            },
          },
        },
      },
    },
  }),
  link: splitLink,
  ssrMode: isServer,
});
