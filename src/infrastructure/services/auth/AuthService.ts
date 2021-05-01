import { authConfig } from '@base/config/auth';
import { Service } from 'typedi';
import { JWTProvider } from './Providers/JWTProvider';

@Service()
export class AuthService {
  private provider: any;

  public constructor() {
    this.setProvider(authConfig.defaultProvider);
  }

  public setProvider(provider: string): this {
    switch (provider) {
      case 'jwt':
        this.provider = new JWTProvider();

      default:
        break;
    }

    return this;
  }

  public sign(payload: object, dataReturn: object): object {
    return this.provider.sign(payload, dataReturn);
  }
}
