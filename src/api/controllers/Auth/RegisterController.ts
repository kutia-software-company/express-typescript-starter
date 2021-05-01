import { Service } from 'typedi';
import { JsonController, Body, Post } from 'routing-controllers';
import { RegisterRequest } from '@api/requests/Auth/RegisterRequest';
import { RegisterService } from '@api/services/Auth/RegisterService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';

@Service()
@OpenAPI({
  tags: ['Auth'],
})
@JsonController('/register')
export class RegisterController extends ControllerBase {
  public constructor(private registerService: RegisterService) {
    super();
  }

  @Post()
  public async register(@Body() user: RegisterRequest) {
    return await this.registerService.register(user);
  }
}
