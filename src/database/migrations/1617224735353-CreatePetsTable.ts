import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePetsTable1617224735353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'pets',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                }, {
                    name: 'age',
                    type: 'int',
                    isNullable: false,
                }, {
                    name: 'user_id',
                    type: 'int',
                    length: '255',
                    isNullable: false,
                },
            ],
        });

        await queryRunner.createTable(table);

        await queryRunner.createForeignKey("pets", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('pets');
    }

}
