import {Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt, AutoIncrement} from 'sequelize-typescript'

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column
  email!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
