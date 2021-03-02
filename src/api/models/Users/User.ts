import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt, AutoIncrement } from 'sequelize-typescript'

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    email: string

    @Column
    password: string

    @CreatedAt
    @Column
    created_at!: Date

    @UpdatedAt
    @Column
    updated_at!: Date
}
