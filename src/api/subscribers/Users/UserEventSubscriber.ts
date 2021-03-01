import { EventSubscriber, On } from 'event-dispatch'

@EventSubscriber()
export class UserEventSubscriber {

    @On('onUserCreate')
    onUserCreate(user: any) {
        console.log('User ' + user.email + ' created!')
    }
}