import mongoose from 'mongoose';
import { TUserModel } from '../__generated__';

const Schema = new mongoose.Schema<TUserModel>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const UserModel = mongoose.model<TUserModel>('User', Schema);
