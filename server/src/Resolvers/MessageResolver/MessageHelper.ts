import { TViewConversation, TConversationModel, TVConversation, TUser } from '../../__generated__';
import { messageModel, userModel } from '../../Models';

class MessageHelper {
	handleGetConvesations = async (
		values: TConversationModel[],
		userId: string
	) => {
		const conversations: TVConversation[] = [];

		for (const conversation of values) {
			const findUser = await userModel.findById(
				conversation.users.filter(item => String(item._id) !== userId)[0]
			).select('-password');
			
			const specificConversation: TViewConversation = await this.handleGetSpecificConversation(conversation);
			conversations.push({ conversation: specificConversation, user: findUser as TUser });
		}

		return conversations;
	};

	handleGetSpecificConversation = async (conversation: TConversationModel) => {
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

		return specificConversation;
	};
}

export const messageHelper = new MessageHelper();
