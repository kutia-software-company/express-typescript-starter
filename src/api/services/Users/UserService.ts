import { Service } from 'typedi'
import { UserRepository } from '../../repositories/Users/UserRepository'
import { UserNotFoundException } from '../../exceptions/Users/UserNotFoundException'
import { EventDispatcher, EventDispatcherInterface } from '../../../decorators/EventDispatcher'
import { InjectRepository } from 'typeorm-typedi-extensions'
import bcrypt from 'bcrypt'

@Service()
export class UserService {
    constructor(
        @InjectRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
        //
    }

    public async getAll() {
        return await this.userRepository.findAndCountRaw()
    }

    public async findOneById(id: number) {
        return await this.getRequestedUserOrFail(id)
    }

    public async create(data: any) {
        data.password = await bcrypt.hash(data.password, 10)

        let user = await this.userRepository.save(data);

        this.eventDispatcher.dispatch('onUserCreate', user)

        return user
    }

    public async updateOneById(id: number, data: any) {
        await this.getRequestedUserOrFail(id)

        return await this.userRepository.update(id, data)
    }

    public async deleteOneById(id: number) {
        return await this.userRepository.delete(id)
    }

    private async getRequestedUserOrFail(id: number) {
        let user = await this.userRepository.findOneByIdRaw(id)

        if (!user) {
            throw new UserNotFoundException
        }

        return user
    }
}