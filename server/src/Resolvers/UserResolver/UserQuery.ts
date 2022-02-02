import { isAuth } from '../../Helpers';
import { TContext } from '../../__generated__';

export const userQuery = {
	me: isAuth((_: any, __: any, context: TContext) => {
		return context.user;
	}),
};
