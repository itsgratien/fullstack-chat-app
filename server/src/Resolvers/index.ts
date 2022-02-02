import { userMutation, userQuery } from './UserResolver';

export const resolvers = {
	Query: {
		hello: () => 'hello',
		...userQuery,
	},
	Mutation: {
		...userMutation,
	},
};
