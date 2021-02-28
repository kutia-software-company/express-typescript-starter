import { Param, Get, JsonController } from 'routing-controllers'
import { UserService } from '../services/UserService'
import { Service } from 'typedi'

@Service()
@JsonController('/users')
export class UserController {
    constructor(
        private userService: UserService
        ) {
        //
    }

    @Get()
    getAll() {
        return this.userService.getAll()
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.userService.findOneById(id)
    }
}