import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode } from 'routing-controllers'
import { Service } from 'typedi'
import { LoginRequest } from '@api/requests/Auth/LoginRequest'
import { LoginService } from '@api/services/Auth/LoginService'
import { ControllerBase } from '@base/abstracts/ControllerBase'

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