import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore } from 'routing-controllers'
import { UserService } from '../../services/Users/UserService'
import { Service } from 'typedi'
import { UserCreate } from '../../validators/Users/UserCreate'
import { AuthCheck } from '../../middlewares/AuthCheck'

@Service()
@JsonController('/users')
@UseBefore(AuthCheck)
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
    @HttpCode(201)
    public async create(@Body({ validate: true }) user: UserCreate) {
        return await this.userService.create(user)
    }

    @Put('/:id')
    public async update(@Param('id') id: number, @Body() user: any) {
        return await this.userService.updateOneById(id, user)
    }

    @Delete('/:id')
    @HttpCode(204)
    public async delete(@Param('id') id: number) {
        return await this.userService.deleteOneById(id)
    }
}