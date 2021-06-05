import Mailgen from 'mailgen';
import { MailGenerator } from '../services/mail/MailGenerator';

export abstract class MailTemplateBase {
  abstract getTemplate(): Mailgen.Content;

  public getHtmlContent() {
    return new MailGenerator().generateHtmlContent(this.getTemplate());
  }
}
