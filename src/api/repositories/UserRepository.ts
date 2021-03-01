import { Service } from 'typedi'
import { User } from '../models/User'

@Service()
export class UserRepository {
    private entity = User

    public async findAndCountAll() {
        return await this.entity.findAndCountAll({raw: true})
    }

    public async findOneById(id: number) {
        return await this.entity.findOne({raw: true, where: { id: id }})
    }

    public async findByPk(id: number) {
        return await this.entity.findByPk(id, { raw: true })
    }

    public async create(user: any) {
        return await this.entity.create(user)
    }
    
    public async update(id: number, data: any) {
        let updatedUser = await this.entity.update(data, { returning: true, where: { id: id } })
        
        return updatedUser
    }
}