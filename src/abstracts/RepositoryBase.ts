import { Repository } from 'typeorm';

export abstract class RepositoryBase<T> extends Repository<T>  {
    public async findAndCountRaw() {
        return await this.findAndCount({  })
    }

    public async findOneByIdRaw(id: number) {
        return await this.findOne({ where: { id: id } })
    }
}
