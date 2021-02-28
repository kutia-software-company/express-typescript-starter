import { Service } from 'typedi'
import { UserRepository } from '../repositories/UserRepository'

@Service()
export class UserService {
    constructor(
        private userRepository: UserRepository
        ) {
        //
    }

    getAll()  {
        return this.userRepository.findAndCountAll()
    }

    findOneById(id: number) {
        return this.userRepository.findOneById(id)
    }
}