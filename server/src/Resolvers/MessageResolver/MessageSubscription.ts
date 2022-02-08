import { withFilter } from 'graphql-subscriptions';
import { pubsub, event } from '../../PubSub';

export const messageSubscription = {
	receiveMessage: {
		subscribe: withFilter(
			() => pubsub.asyncIterator(event.receiveMessage),
			(payload, _variables, context) =>
				String(context.user._id) === payload.receiveMessage.receiver
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
