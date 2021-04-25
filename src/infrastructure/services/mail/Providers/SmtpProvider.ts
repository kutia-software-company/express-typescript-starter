import * as nodeMailer from 'nodemailer';
import { mailConfig } from '@base/config/mail';

export class SmtpProvider {
  private transporter: nodeMailer.Transporter;
  private fromValue: string = mailConfig.fromName + ' ' + mailConfig.authUser;
  private toValue: string;
  private subjectValue: string;
  private textValue: string;
  private htmlValue: string;

  public constructor() {
    this.transporter = nodeMailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      auth: {
        user: mailConfig.authUser,
        pass: mailConfig.authPassword,
      },
    });
  }

  public from(value: string) {
    this.fromValue = value;

    return this;
  }

  public to(value: string) {
    this.toValue = value;

    return this;
  }

  public subject(value: string) {
    this.subjectValue = value;

    return this;
  }

  public text(value: string) {
    this.textValue = value;

    return this;
  }

  public html(value: string) {
    this.htmlValue = value;

    return this;
  }

  public async send() {
    const mailOptions = {
      from: this.fromValue,
      to: this.toValue,
      subject: this.subjectValue,
      text: this.textValue,
      html: this.htmlValue,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
