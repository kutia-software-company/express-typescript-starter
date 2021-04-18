import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1614879263311 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'first_name', type: 'varchar', length: '191' },
                { name: 'last_name', type: 'varchar', length: '191' },
                { name: 'email', type: 'varchar', length: '191' },
                { name: 'password', type: 'varchar', length: '191' }
            ]
        })

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('users');
    }

}
