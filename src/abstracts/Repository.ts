import { isNumber } from 'class-validator'

export abstract class Repository {
    protected applyResourceOptions(options: any) {
        if (!isNumber(options.limit)) {
            delete options.limit
            delete options.offset
        }

        return options
    }
}