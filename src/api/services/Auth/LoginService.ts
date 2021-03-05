import { Service } from 'typedi'
import { UserRepository } from '../../repositories/Users/UserRepository'
import { UserNotFoundException } from '../../exceptions/Users/UserNotFoundException'
import { appConfig } from '../../../config/app'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { InvalidCredentials } from '../../exceptions/Auth/InvalidCredentials'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Service()
export class LoginService {
    private jstExpiresIn = '24h'

    constructor(
        @InjectRepository() private userRepository: UserRepository
    ) {
        //
    }

    public async login(user: any) {
        let userFinded = await this.getRequestedUserByEmailOrFail(user.email)

        if (!await this.comparePassword(user.password, userFinded.password)) {
            throw new InvalidCredentials
        }

        return this.jwt({ userId: userFinded.id, email: userFinded.email }, { user: { id: userFinded.id, email: userFinded.email } })
    }

    private async getRequestedUserByEmailOrFail(email: string) {
        let user = await this.userRepository.findOne({ where: { email: email } })

        if (!user) {
            throw new UserNotFoundException
        }

        return user
    }

    private async jwt(payload: object, dataReturn?: object) {
        return {
            ...dataReturn,
            access_token: jwt.sign(payload, appConfig.jwtSecret, { expiresIn: this.jstExpiresIn }),
            expires_in: this.jstExpiresIn
        }
    }

    private async comparePassword(attempt: string, password: any) {
        return await bcrypt.compare(attempt, password)
    }
}