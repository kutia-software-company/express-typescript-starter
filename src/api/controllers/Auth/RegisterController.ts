import { Service } from 'typedi'
import { Get, JsonController, Body } from 'routing-controllers'
import { RegisterRequest } from '../../requests/Auth/RegisterRequest'
import { RegisterService } from '../../services/Auth/RegisterService'
import { ControllerBase } from '../../../abstracts/ControllerBase'

@Service()
@JsonController('/register')
export class RegisterController extends ControllerBase {
    public constructor(
        private registerService: RegisterService
    ) {
        super()
    }

    @Get()
    public async register(@Body() user: RegisterRequest) {
        return await this.registerService.register(user)
    }
}