import { Service } from 'typedi'
import { UserRepository } from '../../repositories/Users/UserRepository'
import { UserNotFoundException } from '../../exceptions/Users/UserNotFoundException'
import { EventDispatcher, EventDispatcherInterface } from '../../../decorators/EventDispatcher'
import { InjectRepository } from 'typeorm-typedi-extensions'

@Service()
export class UserService {
    constructor(
        @InjectRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
        //
    }

    public async getAll(resourceOptions?: object) {
        return await this.userRepository.findAndCountRaw(resourceOptions)
    }

    public async findOneById(id: number, resourceOptions?: object) {
        return await this.getRequestedUserOrFail(id, resourceOptions)
    }

    public async create(data: any) {
        let user = await this.userRepository.save(this.userRepository.create(data))

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

    private async getRequestedUserOrFail(id: number, resourceOptions?: object) {
        let user = await this.userRepository.findOneByIdRaw(id, resourceOptions)

        if (!user) {
            throw new UserNotFoundException
        }

        return user
    }
}