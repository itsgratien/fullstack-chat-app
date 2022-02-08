import { ApolloError } from 'apollo-server-express';
import { isAuth } from '../../Helpers';
import { TContext, TSendMessageArgs } from '../../__generated__';
import { messageModel, conversationModel, userModel } from '../../Models';
import { pubsub, event } from '../../PubSub';

class MessageMutation {
	sendMessage = isAuth(
		async (_: any, args: TSendMessageArgs, context: TContext) => {
			try {
				const { conversation } = args;

				const timestamp = String(Date.now());

				const findUser = await userModel.findById(args.receiver);
				if (!findUser) {
					return new ApolloError('User (receiver) not found');
				}

				if (String(findUser._id) === String(context.user?._id)) {
					return new ApolloError('Unable to send message');
				}

				pubsub.publish(event.messageSent, {
					messageSent: {
						...args,
						timestamp,
					},
				});

				if (conversation) {
					const findConversation = await conversationModel.findById(
						conversation
					);
					if (!findConversation) {
						return new ApolloError('Unable to send message');
					}
					await messageModel.create({
						conversation,
						message: args.message,
						sender: context.user ? String(context.user._id) : '',
						timestamp,
					});

					return {
						message: 'message sent',
					};
				} else {
					const createConversation = await conversationModel.create({
						users: [{ _id: context.user?._id }, { _id: args.receiver }],
					});

					await messageModel.create({
						conversation: createConversation._id,
						message: args.message,
						sender: context.user?._id || '',
						timestamp,
					});

					return {
						message: 'message sent',
					};
				}
			} catch (error) {
				return new ApolloError(
					'Unable to send message due to internal server error'
				);
			}
		}
	);
	handleWhoIsTyping = isAuth(
		(_root: any, args: { message: string; receiver: string }) => {
			pubsub.publish(event.typing, {
				getWhoIsTyping: args,
			});
			return { message: args.message };
		}
	);
}

export const messageMutation = new MessageMutation();
