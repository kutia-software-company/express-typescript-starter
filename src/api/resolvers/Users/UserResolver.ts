import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { UserService } from '@api/services/Users/UserService';
import { Users } from '@api/types/Users/Users';

@Service()
@Resolver((of) => Users)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [Users])
  public async users(): Promise<any> {
    return await this.userService.getAll().then((result) => {
      return result.rows;
    });
  }
}
