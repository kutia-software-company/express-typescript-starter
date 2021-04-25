import { authConfig } from '@base/config/auth';
import * as jwt from 'jsonwebtoken';

export class JWTProvider {
  public sign(payload: object, dataReturn: object): object {
    return {
      ...dataReturn,
      access_token: jwt.sign(payload, authConfig.providers.jwt.secret, {
        expiresIn: authConfig.providers.jwt.expiresIn,
      }),
      expires_in: authConfig.providers.jwt.expiresIn,
    };
  }
}
