import { Service } from 'typedi';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { InvalidCredentials } from '@api/exceptions/Auth/InvalidCredentials';
import bcrypt from 'bcrypt';
import { AuthService } from '@base/infrastructure/services/auth/AuthService';
import { LoginRequest } from '@base/api/requests/Auth/LoginRequest';

@Service()
export class LoginService {
  constructor(@InjectRepository() private userRepository: UserRepository, private authService: AuthService) {
    //
  }

  public async login(data: LoginRequest) {
    let user = await this.userRepository.findOne({ where: { email: data.email }, relations: ['role'] });

    if (!user) {
      throw new InvalidCredentials();
    }

    if (!(await this.comparePassword(data.password, user.password))) {
      throw new InvalidCredentials();
    }

    return this.authService.sign(
      { userId: user.id, email: user.email, role_id: user.role_id, role: user.role.name },
      { user: { id: user.id, email: user.email, role: user.role.name } },
    );
  }

  private async comparePassword(attempt: string, password: any) {
    return await bcrypt.compare(attempt, password);
  }
}
