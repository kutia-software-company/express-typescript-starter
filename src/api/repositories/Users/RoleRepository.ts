import { Role } from '@api/models/Users/Role';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Role)
export class RoleRepository extends RepositoryBase<Role> {
  public async createRole(data: object) {
    let entity = new Role();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateRole(role: Role, data: object) {
    Object.assign(role, data);

    return await role.save(data);
  }

  public async createRoles(data: any[]) {
    const roles: Role[] = [];

    data.forEach((element) => {
      const role = new Role();
      role.name = element.name;
      roles.push(role);
    });

    await this.save(roles);
  }
}
