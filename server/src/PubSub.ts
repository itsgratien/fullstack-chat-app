import { PubSub } from 'graphql-subscriptions';

export const event = {
	messageSent: 'MESSAGE_SENT',
	typing: 'TYPING'
};

export const pubsub = new PubSub();
