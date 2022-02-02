import mongoose from 'mongoose';
import { TConversation } from '../__generated__';

const Schema = new mongoose.Schema<TConversation>(
	{
		users: {
			type: [
				{
					_id: mongoose.Schema.Types.ObjectId,
				},
			],
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

export const conversationModel = mongoose.model<TConversation>(
	'Conversation',
	Schema
);
