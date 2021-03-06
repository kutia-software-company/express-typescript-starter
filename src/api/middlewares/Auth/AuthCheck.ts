import { ExpressMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import * as jwt from 'jsonwebtoken'
import { appConfig } from '../../../config/app'

@Service()
export class AuthCheck implements ExpressMiddlewareInterface {
    use(request: any, response: any, next?: (err?: any) => any): any {
        const authHeader = request.headers.authorization
        if (!authHeader) {
            return response.sendStatus(401)
        }

        const token = authHeader.split(' ')[1]

        jwt.verify(token, appConfig.jwtSecret, (err: any, user: any) => {
            if (err) {
                return response.sendStatus(403)
            }

            request.loggedUser = user
            next()
        })
    }
}