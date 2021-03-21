import { User } from '../../models/Users/User'
import { EntityRepository } from 'typeorm'
import { RepositoryBase } from '../../../abstracts/RepositoryBase'

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User>  {
    // 
}