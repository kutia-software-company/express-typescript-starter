import Mailgen from 'mailgen';
import { Service } from 'typedi';
import { appConfig } from '@base/config/app';

@Service()
export class ForgotPasswordTemplate {
  static getTemplate(name: string, email: string, forgotKey: string): Mailgen.Content {
    return {
      body: {
        name,
        intro: 'You have received this email because a password reset request for your account was received.',
        action: {
          instructions: 'Click the button below to reset your password:',
          button: {
            color: '#DC4D2F',
            text: 'Reset your password',
            link: `${appConfig.url}/reset-password?email=${email}&key=${forgotKey}`,
          },
        },
        outro: 'If you did not request a password reset, no further action is required on your part.',
      },
    };
  }
}
