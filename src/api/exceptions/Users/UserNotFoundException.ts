import { NotFoundError } from 'routing-controllers';

export class UserNotFoundException extends NotFoundError {
  constructor() {
    super('User not found!');
  }
}
