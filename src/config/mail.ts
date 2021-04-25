import { env } from '@base/utils/env';

export const mailConfig = {
  provider: env('MAIL_PROVIDER'),
  host: env('MAIL_HOST'),
  port: Number(env('MAIL_PORT')),
  authUser: env('MAIL_AUTH_USER'),
  authPassword: env('MAIL_AUTH_PASSWORD'),
  fromName: env('MAIL_FROM_NAME'),
};
