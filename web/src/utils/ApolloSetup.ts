import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { Enum } from './Enum';
import fetch from 'isomorphic-unfetch';
import { getMainDefinition } from '@apollo/client/utilities';

const isServer = typeof window === 'undefined';

const httpUri = 'http://localhost:4000/graphql';
const httpLink = new HttpLink({
  uri: httpUri,
  headers: {
    Authorization: isServer ? '' : String(localStorage.getItem(Enum.Token)),
  },
  fetch,
});

const wsLink = () =>
  new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: String(localStorage.getItem(Enum.Token)),
      },
    },
  });

export const splitLink = !isServer
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink(),
      httpLink
    )
  : httpLink;

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
