import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import { RoleRepository } from '@base/api/repositories/Users/RoleRepository';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const roles = [{ name: 'Admin' }, { name: 'Client' }];

    for (const [key, value] of Object.entries(roles)) {
      const role = await connection.getCustomRepository(RoleRepository).findOne({ where: { name: value.name } });

      if (role) {
        continue;
      }

      await connection.getCustomRepository(RoleRepository).createRole({ name: value.name });
    }
  }
}
