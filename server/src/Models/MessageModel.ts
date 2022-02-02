import mongoose from 'mongoose';
import { TMessage } from '../__generated__';

const Schema = new mongoose.Schema<TMessage>(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		read: {
			type: Boolean,
			default: false,
		},
		conversation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Conversation',
		},
	},
	{ timestamps: true }
);

export const messageModel = mongoose.model<TMessage>('Message', Schema);
