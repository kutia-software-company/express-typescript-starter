import { Sequelize } from 'sequelize-typescript'
import { User } from '../api/models/User'
import { dbConfig } from '../config/db'

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: dbConfig.dbHost,
    port: Number(dbConfig.dbPort),
    database: dbConfig.dbDatabase,
    username: dbConfig.dbUsername,
    password: dbConfig.dbPassword,
    models: [User],
    query: { raw: true }
})