import { Service } from 'typedi'
import { UserRepository } from '../../repositories/Users/UserRepository'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { EventDispatcher, EventDispatcherInterface } from '../../../decorators/EventDispatcher'
import * as jwt from 'jsonwebtoken'
import { appConfig } from '../../../config/app'

@Service()
export class RegisterService {
    private jstExpiresIn = '24h'

    constructor(
        @InjectRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) {
        //
    }

    public async register(data: object) {
        let user = await this.userRepository.save(this.userRepository.create(data))

        this.eventDispatcher.dispatch('onUserRegistered', user)

        return this.jwt({ userId: user.id, email: user.email }, { user: { id: user.id, email: user.email } })
    }

    private async jwt(payload: object, dataReturn?: object) {
        return {
            ...dataReturn,
            access_token: jwt.sign(payload, appConfig.jwtSecret, { expiresIn: this.jstExpiresIn }),
            expires_in: this.jstExpiresIn
        }
    }
}