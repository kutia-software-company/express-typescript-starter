import { EventSubscriber, On } from 'event-dispatch'
import { SendWelcomeMail } from '../../queue-jobs/SendWelcomeMail'

@EventSubscriber()
export class UserEventSubscriber {
    @On('onUserRegistered')
    public onUserRegistered(user: any) {
        (new SendWelcomeMail(user)).process()
    }

    @On('onUserCreate')
    public onUserCreate(user: any) {
        console.log('User ' + user.email + ' created!')
    }
}