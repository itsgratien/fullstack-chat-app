import passport from 'passport';
import { Request, Response } from 'express';
import {
	Strategy as JwtStrategy,
	ExtractJwt,
	JwtFromRequestFunction,
} from 'passport-jwt';
import { AuthenticationError } from 'apollo-server-express';
import { environment } from '../Config';
import { userModel } from '../Models';
import { TContext, TUser } from '../__generated__';
import { generate } from '../Helpers';

const opts: {
  secretOrKey: string;
  jwtFromRequest: JwtFromRequestFunction;
} = {
	secretOrKey: environment.secretKey,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
	new JwtStrategy(opts, async (payload, done) => {
		const find = await userModel.findById(payload._id).select('-password');

		if (!find) {
			done('Unauthorized access', null);
		}

		done(null, find);
	})
);

export const authenticateWithPassportJwt = <T>(
	req: Request,
	res: Response
): Promise<T> => {
	return new Promise((resolve, reject) => {
		passport.authenticate('jwt', (error, user) => {
			if (error) {
				reject(error);
			}

			if (user) {
				resolve(user);
			} else {
				reject('Unauthorized access');
			}
		})(req, res);
	});
};

export const isAuth =
  (next: (root: any, args: any, context: TContext) => any) =>
  	async <T>(root: T, args: T, context: TContext) => {
  		try {
  			const user: TUser = await authenticateWithPassportJwt(
  				context.req,
  				context.res
  			);
  			context.user = user;
  			return next(root, args, context);
  		} catch (error: any) {
  			return new AuthenticationError(error);
  		}
  	};

export const isAuthForSubscription = async (bearerToken: string) => {
	const token = bearerToken.split(' ');

	const payload = generate.verifyAuthToken(token[1] || token[0]);

	if (!payload) {
		return undefined;	
	}
	const findUser = await userModel.findById(payload._id).select('-password');

	if (!findUser) return undefined;
	return findUser;
};
