import { env } from '@base/utils/env';

export const authConfig = {
  defaultProvider: env('AUTH_DEFAULT_PROVIDER', 'jwt'),

  providers: {
    jwt: {
      secret: env('JWT_SECRET'),
      expiresIn: '24h',
    },
  },
};
