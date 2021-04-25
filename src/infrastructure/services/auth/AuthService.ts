import { authConfig } from '@base/config/auth';
import { Service } from 'typedi';
import { JWTProvider } from './Providers/JWTProvider';

@Service()
export class AuthService {
  private provider: any;

  public constructor() {
    switch (authConfig.defaultProvider) {
      default:
        this.provider = new JWTProvider();
        break;
    }
  }

  public setProvider(provider: string): this {
    this.provider = provider;

    return this;
  }

  public sign(payload: object, dataReturn: object): object {
    return this.provider.sign(payload, dataReturn);
  }
}
