import { Sequelize } from 'sequelize-typescript'
import { User } from '../api/models/User'
import { dbConfig } from '../config/db'
import { appConfig } from '../config/app'

console.log(appConfig.appPath + '/api/models')

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: dbConfig.dbHost,
    port: Number(dbConfig.dbPort),
    database: dbConfig.dbDatabase,
    username: dbConfig.dbUsername,
    password: dbConfig.dbPassword,
    models: [appConfig.appPath + appConfig.entities],
    query: { raw: true }
})