import { ApolloError } from 'apollo-server-express';
import { isAuth } from '../../Helpers';
import { TContext, TVConversation } from '../../__generated__';
import { messageModel, conversationModel } from '../../Models';
import { messageHelper } from './MessageHelper';
class MessageQuery {
	getMessages = isAuth(
		async (_: any, args: { conversation: string }, context: TContext) => {
			try {
				const findConversation = await conversationModel.findOne({
					$and: [
						{ _id: args.conversation },
						{ users: { $in: [{ _id: context.user?._id }] } },
					],
				});

				if (!findConversation) {
					return new ApolloError('message not found');
				}
				const findMessage = await messageModel
					.find({ conversation: findConversation._id })
					.sort({ createdAt: 1 })
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

	getConversations = isAuth(
		async (_root: any, _args: any, context: TContext) => {
			try {
				const find = await conversationModel.find({
					users: { $in: [{ _id: context.user?._id }] },
				});
				let conversations: TVConversation[] = [];

				if (find.length > 0) {
					conversations = await messageHelper.handleGetConvesations(find, String(context.user?._id));
				}

				return {
					data: conversations,
				};
			} catch (error) {
				return new ApolloError(
					'Unable to view conversations due to internal server error'
				);
			}
		}
	);
}
export const messageQuery = new MessageQuery();
