import { PubSub } from 'graphql-subscriptions';

export const event = {
	receiveMessage: 'RECEIVE_MESSAGE',
	typing: 'TYPING'
};

export const pubsub = new PubSub();
