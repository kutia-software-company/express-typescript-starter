import { ExpressErrorMiddlewareInterface, Middleware, HttpError } from 'routing-controllers'
import { ValidationError } from 'class-validator'
import * as express from 'express'
import { Service } from 'typedi'

@Service()
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    public error(error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {
        const responseObject = {} as any

        // Status code
        if (error instanceof HttpError && error.httpCode) {
            res.status(error.httpCode)
        } else {
            res.status(500)
        }

        // Object
        responseObject.success = false
        responseObject.status = error.httpCode
        responseObject.message = error.message

        // Class validator handle errors
        if (error.httpCode == 400) {
            let validatorErrors = {} as any
            error.errors.forEach((element: any) => {
                if (element.property && element.constraints) {
                    validatorErrors[element.property] = element.constraints
                }
            })
            responseObject.errors = validatorErrors
        }

        // Append stack
        if (error.stack && process.env.NODE_ENV === 'development' && error.httpCode == 500) {
            responseObject.stack = error.stack
        }

        // Final response
        res.json(responseObject)
    }
}