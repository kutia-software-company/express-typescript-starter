export interface MailInterface {
  from(value: string): this;

  to(value: string): this;

  subject(value: string): this;

  text(value: string): this;

  html(value: string): this;

  send(): Promise<any>;
}
