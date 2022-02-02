import { userMutation, userQuery } from './UserResolver';
import { messageSubscription } from './MessageResolver';

export const resolvers = {
	Query: {
		hello: () => 'hello',
		...userQuery,
	},
	Mutation: {
		...userMutation,
	},
	Subscription: {
		...messageSubscription,
	},
};
