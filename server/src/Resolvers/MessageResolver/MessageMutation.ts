import { ApolloError } from 'apollo-server-express';
import { isAuth } from '../../Helpers';
import { TContext, TSendMessageArgs } from '../../__generated__';
import { messageModel, conversationModel } from '../../Models';

class MessageMutation {
	sendMessage = isAuth(
		async (_: any, args: TSendMessageArgs, context: TContext) => {
			try {
				const { conversation } = args;

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


}

export const messageMutation = new MessageMutation();
