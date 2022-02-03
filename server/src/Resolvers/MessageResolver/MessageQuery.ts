import { ApolloError } from 'apollo-server-express';
import { isAuth } from '../../Helpers';
import { TContext } from '../../__generated__';
import { messageModel, conversationModel } from '../../Models';

class MessageQuery {
	viewMessage = isAuth(
		async (_: any, args: { conversation: string }, context: TContext) => {
			try {
				const findConversation = await conversationModel.findOne({
					$and: [
						{ _id: args.conversation },
						{ users: { $in: [context.user?._id] } },
					],
				});

				if (!findConversation) {
					return new ApolloError('message not found');
				}
				const findMessage = await messageModel
					.find({ conversation: findConversation._id })
					.sort({ createdAt: -1 })
					.populate({
						model: 'User',
						select: '_id username profilePicture email',
						path: 'sender',
					});

				return {
					data: findMessage,
				};
			} catch (error) {
				return new ApolloError(
					'Unable to view message due to internal server error'
				);
			}
		}
	);
}
export const messageQuery = new MessageQuery();
