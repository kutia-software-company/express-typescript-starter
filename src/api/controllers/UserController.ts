import { Param, Get, JsonController, Post, Body } from 'routing-controllers'
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
    public async getOne(@Param('id') id: number) {
        return this.userService.findOneById(id)
    }

    @Post()
    create(@Body() user: any) {
        return this.userService.create(user)
    }
}