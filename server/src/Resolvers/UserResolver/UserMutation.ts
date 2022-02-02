import { ApolloError } from 'apollo-server-express';
import { TCreateAccountArgs, TLoginArgs } from '../../__generated__';
import { generate } from '../../Helpers';
import { userModel } from '../../Models';

export const userMutation = {
	createAccount: async (_: any, args: TCreateAccountArgs) => {
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
	},
	login: async (_: any, args: TLoginArgs) => {
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
					updatedAt: find.updatedAt
				},
			};
		} catch (error) {
			return new ApolloError('Unable to login due to internal server error');
		}
	},
};
