import 'reflect-metadata'
import { appConfig } from './config/app'
import { Application } from 'express'
import { createExpressServer, useContainer as routingControllersUseContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { sequelize } from './utlis/sequelize'
import { eventDispatcher } from './utlis/eventDispatcher'

routingControllersUseContainer(Container)

// Define port
const port = appConfig.port || 3000;

// Sequelize
(async () => {
    await sequelize

    // Load subscribers
    eventDispatcher()

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
})()