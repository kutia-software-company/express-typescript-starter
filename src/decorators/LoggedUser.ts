import { createParamDecorator } from 'routing-controllers';

export function LoggedUser() {
  return createParamDecorator({
    value: (action) => {
      return action.request.loggedUser;
    },
  });
}
