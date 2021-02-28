import 'reflect-metadata'
import { appConfig } from './config/app'
import { Application } from 'express'
import { createExpressServer, useContainer as routingControllersUseContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { useContainer as classValidatorUseContainer } from 'class-validator'
import {sequelize} from './lib/sequelize'

routingControllersUseContainer(Container)
classValidatorUseContainer(Container)

// Define port
const port = appConfig.port || 3000;

// Sequelize
(async () => {
    await sequelize.sync({force: false})

    // Create a new express server instance
    const expressApp: Application = createExpressServer({
        validation: true,
        cors: true,
        classTransformer: true,
        defaultErrorHandler: false,
        routePrefix: appConfig.routePrefix,
        controllers: [__dirname + '/api/controllers/*.ts']
    })

    // Define a route handler for the default home page
    expressApp.get('/', (req, res) => {
        res.send('Hello world!')
    })

    // Start the Express server
    expressApp.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`)
    })
})()