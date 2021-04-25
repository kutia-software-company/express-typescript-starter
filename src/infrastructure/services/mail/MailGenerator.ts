import Mailgen from 'mailgen';
import { Service } from 'typedi';
import { appConfig } from '@base/config/app';

@Service()
export class MailGenerator {
  private readonly mailGenerator: Mailgen;

  constructor() {
    this.mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        // Appears in header & footer of e-mails
        name: appConfig.name,
        link: appConfig.url,
      },
    });
  }

  generatePlaintext(params: Mailgen.Content): string {
    return this.mailGenerator.generatePlaintext(params);
  }

  generateHtmlContent(params: Mailgen.Content): string {
    return this.mailGenerator.generate(params);
  }
}
