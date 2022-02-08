import { ApolloError } from 'apollo-server-express';
import { isAuth } from '../../Helpers';
import { TContext, TViewConversation } from '../../__generated__';
import { messageModel, conversationModel, userModel } from '../../Models';
import { pubsub, event } from '../../PubSub';

class MessageQuery {
	viewMessage = isAuth(
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
	viewConversation = isAuth(
		async (_root: any, _args: any, context: TContext) => {
			try {
				const find = await conversationModel.find({
					users: { $in: [{ _id: context.user?._id }] },
				});
				const conversations: TViewConversation[] = [];
				if (find.length > 0) {
					for (const conversation of find) {
						const specificConversation: TViewConversation = {
							_id: conversation._id,
							createdAt: conversation.createdAt,
							updatedAt: conversation.updatedAt,
						};
						const findMessage = await messageModel
							.find({
								conversation: conversation._id,
							})
							.sort({ createdAt: -1 })
							.populate({
								path: 'sender',
								select: '-password',
								model: userModel,
							});
						if (findMessage && findMessage.length > 0) {
							specificConversation.latestMessage = {
								message: findMessage[0].message,
								timestamp: String(findMessage[0].timestamp),
								_id: findMessage[0]._id,
							};
							specificConversation.sender = findMessage[0].sender;
						}
						conversations.push(specificConversation);
					}
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
