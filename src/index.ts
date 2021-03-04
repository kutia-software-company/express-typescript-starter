import 'reflect-metadata'
import { appConfig } from './config/app'
import { dbConfig } from './config/db'
import { Application } from 'express'
import { createExpressServer, useContainer as routingControllersUseContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { createConnection, useContainer as ormUseContainer } from 'typeorm'
import { Container as containerTypeorm } from 'typeorm-typedi-extensions';

routingControllersUseContainer(Container)
ormUseContainer(containerTypeorm);

// Define port
const port = appConfig.port || 3000

// Create typeorm connection
createConnection({
    type: 'mysql',
    host: dbConfig.dbHost,
    port: Number(dbConfig.dbPort),
    username: dbConfig.dbUsername,
    password: dbConfig.dbPassword,
    database: dbConfig.dbDatabase,
    entities: [appConfig.appPath + appConfig.entities],
    logging: true
}).then(async connection => {
    // Create a new express server instance
    const expressApp: Application = createExpressServer({
        validation: true,
        cors: true,
        classTransformer: true,
        defaultErrorHandler: true,
        routePrefix: appConfig.routePrefix,
        controllers: [__dirname + appConfig.controllers],
        middlewares: [__dirname + appConfig.middlewares]
    })

    // Define a route handler for the default home page
    expressApp.get('/', (req, res) => {
        res.send('Hello world!')
    })

    // Start the Express server
    expressApp.listen(port, () => {
        console.log(`🚀 Server started at http://localhost:${port}`)
    })
}).catch(error => console.log('Error: ', error));