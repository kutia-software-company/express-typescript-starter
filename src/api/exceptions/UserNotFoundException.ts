import { HttpError } from 'routing-controllers'

export class UserNotFoundException extends HttpError {
    constructor() {
        super(404, 'User not found!')
    }
}