import { UnauthorizedError } from 'routing-controllers';

export class InvalidCredentials extends UnauthorizedError {
  constructor() {
    super('Invalid credentials!');
  }
}
