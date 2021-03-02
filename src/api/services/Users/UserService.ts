import { Service } from 'typedi'
import { UserRepository } from '../../repositories/Users/UserRepository'
import { UserNotFoundException } from '../../exceptions/Users/UserNotFoundException'
import { EventDispatcher, EventDispatcherInterface } from '../../../decorators/EventDispatcher'

@Service()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) {
        //
    }

    public async getAll() {
        return await this.userRepository.findAndCountAll()
    }

    public async findOneById(id: number) {
        return await this.getRequestedUserOrFail(id)
    }

    public async create(user: any) {
        let userCreated = await this.userRepository.create(user)

        this.eventDispatcher.dispatch('onUserCreate', userCreated)

        return userCreated
    }

    public async updateOneById(id: number, data: any) {
        return await this.userRepository.update(id, data)
    }

    public async deleteOneById(id: number) {
        return await this.userRepository.delete(id)
    }

    private async getRequestedUserOrFail(id: number) {
        let user = await this.userRepository.findOne({ where: { id: id } })

        if (!user) {
            throw new UserNotFoundException
        }

        return user
    }
}