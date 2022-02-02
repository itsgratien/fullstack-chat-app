import { PubSub } from 'graphql-subscriptions';

export const event = {
	messageSent: 'MESSAGE_SENT',
};

export const pubSub = new PubSub();
