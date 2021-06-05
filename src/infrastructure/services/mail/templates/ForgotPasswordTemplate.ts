import Mailgen from 'mailgen';
import { Service } from 'typedi';
import { appConfig } from '@base/config/app';
import { MailGenerator } from '../MailGenerator';
import { MailTemplateBase } from '@base/infrastructure/abstracts/MailTemplateBase';

@Service()
export class ForgotPasswordTemplate extends MailTemplateBase {
  private username: string;
  private token: string;

  constructor(username: string, token: string) {
    super();
    this.username = username;
    this.token = token;
  }

  public getTemplate(): Mailgen.Content {
    return {
      body: {
        name: this.username,
        intro: 'You have received this email because a password reset request for your account was received.',
        action: {
          instructions: 'Click the button below to reset your password:',
          button: {
            color: '#DC4D2F',
            text: 'Reset your password',
            link: `${appConfig.url}/reset-password?token=${this.token}`,
          },
        },
        outro: 'If you did not request a password reset, no further action is required on your part.',
      },
    };
  }
}
