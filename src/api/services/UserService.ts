import { Service } from 'typedi'
import { UserRepository } from '../repositories/UserRepository'
import { UserNotFoundException } from '../exceptions/UserNotFoundException'

@Service()
export class UserService {
    constructor(
        private userRepository: UserRepository
        ) {
        //
    }

    public async getAll()  {
        return await this.userRepository.findAndCountAll()
    }

    public async findOneById(id: number) {
      return this.getRequestedUserOrFail(id)
    }

    public async create(user: any) {
        return await this.userRepository.create(user)
    }

    private async getRequestedUserOrFail(id: number) {
        let user = await this.userRepository.findOneById(id)

        if (!user) {
            throw new UserNotFoundException
        }

        return user
    }
}