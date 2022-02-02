import { pubSub, event } from '../../PubSub';

export const messageSubscription = {
	messageSent: {
		subscribe: () => pubSub.asyncIterator([event.messageSent]),
	},
};
