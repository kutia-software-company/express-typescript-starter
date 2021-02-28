import { Sequelize } from 'sequelize-typescript';
import { User } from '../api/models/User';
import { dbConfig } from '../config/db'

export const sequelize = new Sequelize({
  dialect: 'mysql',
  database: dbConfig.typeormDatabase,
  storage: ':memory:',
  username: dbConfig.typeormUsername,
  password: dbConfig.typeormPassword,
  host: dbConfig.typeormHost,
  port: Number(dbConfig.typeormPort),
  models: [User]
})