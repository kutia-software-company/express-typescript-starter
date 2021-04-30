import { EventSubscriber, On } from 'event-dispatch';
import { SendWelcomeMail } from '@api/queue-jobs/Users/SendWelcomeMail';

@EventSubscriber()
export class UserEvent {
  @On('onUserRegister')
  public onUserRegister(user: any) {
    new SendWelcomeMail(user).setOptions({ delay: 5000 }).dispatch();
  }

  @On('onUserCreate')
  public onUserCreate(user: any) {
    console.log('User ' + user.email + ' created!');
  }
}
