import { ForbiddenError } from 'routing-controllers';

export class ForbiddenException extends ForbiddenError {
  constructor() {
    super('Forbidden!');
  }
}
