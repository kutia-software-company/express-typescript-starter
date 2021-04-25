import { mailConfig } from '@base/config/mail';
import { Service } from 'typedi';
import { SmtpProvider } from './Providers/SmtpProvider';
import { MailInterface } from './Interfaces/MailInterface';

@Service()
export class MailService implements MailInterface {
  private provider: any;

  public constructor() {
    switch (mailConfig.provider) {
      default:
        this.provider = new SmtpProvider();
        break;
    }
  }

  public from(value: string): this {
    return this.provider.from(value);
  }

  public to(value: string): this {
    return this.provider.to(value);
  }

  public subject(value: string): this {
    return this.provider.subject(value);
  }

  public text(value: string): this {
    return this.provider.text(value);
  }

  public html(value: string): this {
    return this.provider.html(value);
  }

  public async send(): Promise<any> {
    return await this.provider.send();
  }
}
