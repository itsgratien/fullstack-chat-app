import { withFilter } from 'graphql-subscriptions';
import { pubsub, event } from '../../PubSub';

export const messageSubscription = {
	messageSent: {
		subscribe: withFilter(
			() => pubsub.asyncIterator(event.messageSent),
			(payload, _variables, context) =>
				String(context.user._id) === payload.messageSent.receiver
		),
	},
	getWhoIsTyping: {
		subscribe: withFilter(
			() => pubsub.asyncIterator(event.typing),
			(payload, _variables, context) =>
				String(context.user._id) === payload.getWhoIsTyping.receiver
		),
	},
};
