import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode } from 'routing-controllers'
import { Service } from 'typedi'
import { LoginRequest } from '../../requests/Auth/LoginRequest'
import { LoginService } from '../..//services/Auth/LoginService'
import { ControllerBase } from '../../../abstracts/ControllerBase'

@Service()
@JsonController('/login')
export class LoginController extends ControllerBase {
    public constructor(
        private loginService: LoginService
    ) {
        super()
    }

    @Get()
    public async login(@Body({ validate: true }) user: LoginRequest) {
        return await this.loginService.login(user)
    }
}