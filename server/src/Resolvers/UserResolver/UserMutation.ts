import { ApolloError } from 'apollo-server-express';
import {
	TContext,
	TCreateAccountArgs,
	TLoginArgs,
	TSearchUser,
	TVConversation,
} from '../../__generated__';
import { generate, isAuth } from '../../Helpers';
import { userModel, conversationModel } from '../../Models';
import { messageHelper } from '../MessageResolver/MessageHelper';

class UserMutation {
	createAccount = async (_: any, args: TCreateAccountArgs) => {
		try {
			const create = await userModel.create({
				...args,
				password: generate.hashPassword(args.password),
			});
			return {
				message: 'Your account was created successfully',
				data: create,
			};
		} catch (error) {
			return new ApolloError(
				'Unable to create account due to internal server error'
			);
		}
	};

	login = async (_: any, args: TLoginArgs) => {
		try {
			const find = await userModel.findOne({ username: args.username });

			if (!find) {
				return new ApolloError('Account not found');
			}
			const comparePassword = generate.comparePassword(
				find.password,
				args.password
			);

			if (!comparePassword) {
				return new ApolloError('Incorrect password or username');
			}

			const generateToken = generate.generateToken({ _id: find._id });

			return {
				token: generateToken,
				data: {
					username: find.username,
					_id: find._id,
					email: find.email,
					profilePicture: find.profilePicture,
					createdAt: find.createdAt,
					updatedAt: find.updatedAt,
				},
			};
		} catch (error: any) {
			return new ApolloError(
				`Unable to login due to internal server error ${error.message}`
			);
		}
	};

	searchUser = isAuth(
		async (_root: any, args: { user: string }, context: TContext) => {
			try {
				const findUser = await userModel.find({
					username: { $regex: args.user },
				});

				const users: TVConversation[] = [];

				if (findUser.length > 0) {
					for (const i of findUser) {
						const user: TVConversation = { user: i };
						const findConversation = await conversationModel
							.find({
								$or: [
									{
										users: {
											$in: [{ _id: i._id }, { _id: context.user?._id }],
										},
									},
									{
										users: {
											$in: [{ _id: context.user?._id }, { _id: i._id }],
										},
									},
								],
							})
							.sort({ createdAt: -1 });

						if (findConversation.length > 0) {
							for (const conversation of findConversation) {
								const specificConversation = await messageHelper.handleGetSpecificConversation(conversation);
								user.conversation = specificConversation;
							}
						}
						users.push(user);
					}
				}
				return {
					data: users,
				};
			} catch (error: any) {
				return new ApolloError(
					`Unable to search user due to internal server error ${error.message}`
				);
			}
		}
	);
}
export const userMutation = new UserMutation();
