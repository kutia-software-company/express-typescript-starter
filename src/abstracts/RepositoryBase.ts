import { Repository } from 'typeorm'
import { isNumber } from 'class-validator'

export abstract class RepositoryBase<T> extends Repository<T>  {
    public async findAndCountRaw(resourceOptions?: object) {
        return await this.findAndCount(this.applyResourceOptions(resourceOptions))
    }

    public async findOneByIdRaw(id: number) {
        return await this.findOne({ where: { id: id } })
    }

    protected applyResourceOptions(options: any) {
        if (!isNumber(options.limit)) {
            delete options.limit
            delete options.offset
        }

        return options
    }
}
