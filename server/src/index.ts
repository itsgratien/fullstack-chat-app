import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { execute, subscribe } from 'graphql';
import {
	SubscriptionServer,
	ConnectionParams,
	ConnectionContext,
} from 'subscriptions-transport-ws';
import { connect } from './Config';
import { typeDefs } from './TypeDefs';
import { resolvers } from './Resolvers';
import { isAuthForSubscription } from './Helpers';

const startServer = async () => {
	const app = express();

	app.use(
		cors({
			credentials: true,
			origin: '*'
		})
	);

	const httpServer = http.createServer(app);

	const subscriptionServer = SubscriptionServer.create(
		{
			schema: makeExecutableSchema({ typeDefs, resolvers }),
			execute,
			subscribe,
			onConnect: async (
				connectionParams: ConnectionParams,
				_websocket: any,
				context: ConnectionContext
			) => {
				let user = null;
				if (connectionParams.Authorization) {
					user = await isAuthForSubscription(connectionParams.Authorization);
				}
				return { context, user };
			},
		},
		{
			server: httpServer,
			path: '/graphql',
		}
	);

	const server = new ApolloServer({
		schema: makeExecutableSchema({ typeDefs, resolvers }),
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				serverWillStart: async () => {
					return {
						drainServer: async () => {
							subscriptionServer.close();
						},
					};
				},
			},
		],
		context: ({ req, res }) => ({req, res}),
	});

	await server.start();

	server.applyMiddleware({ app });

	await new Promise<void>(resolve =>
		httpServer.listen({ port: 4000 }, resolve)
	);

	await connect();

	console.log(
		`server started on port http://localhost:4000${server.graphqlPath}`
	);

	return { server, app };
};
startServer();
