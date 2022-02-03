import { userMutation, userQuery } from './UserResolver';
import { messageSubscription, messageMutation, messageQuery } from './MessageResolver';

export const resolvers = {
	Query: {
		hello: () => 'hello',
		...userQuery,
		...messageQuery
	},
	Mutation: {
		...userMutation,
		...messageMutation,
	},
	Subscription: {
		...messageSubscription,
	},
};
