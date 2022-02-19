import { isAuth } from '../../Helpers';
import { TContext } from '../../__generated__';

class UserQuery {
  me = isAuth((_: any, __: any, context: TContext) => {
    return context.user;
  });
}

export const userQuery = new UserQuery();
