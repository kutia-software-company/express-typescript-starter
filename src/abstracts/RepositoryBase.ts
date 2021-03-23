import { Repository } from 'typeorm'
import { isNumber } from 'class-validator'

export abstract class RepositoryBase<T> extends Repository<T>  {
    public async findAndCountRaw(resourceOptions?: object) {
        return await this.findAndCount(this.applyResourceOptions(resourceOptions)).then((result) => {
            return {
                'total_data': result[1],
                'rows': result[0]
            }
        })
    }

    public async findOneByIdRaw(id: number, resourceOptions?: object) {
        return await this.findOne({ where: { id: id }, ...this.applyResourceOptions(resourceOptions) })
    }

    protected applyResourceOptions(options: any) {
        if(!options) {
            return
        }

        if (!isNumber(options.limit)) {
            delete options.limit
            delete options.offset
        }

        return options
    }
}
