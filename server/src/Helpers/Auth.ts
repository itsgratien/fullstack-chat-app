import passport from 'passport';
import { Request, Response } from 'express';
import {
	Strategy as JwtStrategy,
	ExtractJwt,
	JwtFromRequestFunction,
} from 'passport-jwt';
import { AuthenticationError } from 'apollo-server-express';
import { environment } from '../Config';
import { UserModel } from '../Models';
import { TContext, TUserModel } from '../__generated__';

const opts: {
  secretOrKey: string;
  jwtFromRequest: JwtFromRequestFunction;
} = {
	secretOrKey: environment.secretKey,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
	new JwtStrategy(opts, async (payload, done) => {
		const find = await UserModel.findById(payload._id).select('-password');

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
  (next: <Root, Args>(root: Root, args: Args, context: TContext) => any) =>
  	async <Root, Args>(root: Root, args: Args, context: TContext) => {
  		try {
  			const user: TUserModel = await authenticateWithPassportJwt(
  				context.req,
  				context.res
  			);
  			context.user = user;
  			return next(root, args, context);
  		} catch (error: any) {
  			return new AuthenticationError(error);
  		}
  	};
