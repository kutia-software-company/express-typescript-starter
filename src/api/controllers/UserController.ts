import { Param, Get, JsonController, Post, Body, Put } from 'routing-controllers'
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
    public async getAll() {
        return await this.userService.getAll()
    }

    @Get('/:id')
    public async getOne(@Param('id') id: number) {
        return await this.userService.findOneById(id)
    }

    @Post()
    public async create(@Body() user: any) {
        return await this.userService.create(user)
    }

    @Put('/:id')
    public async update(@Param('id') id: number, @Body() user: any) {
        return this.userService.updateOneById(id, user)
    }
}