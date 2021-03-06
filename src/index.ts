import 'reflect-metadata'
import { appConfig } from './config/app'
import { Application } from 'express'
import { createExpressServer, useContainer as routingControllersUseContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { createConnection, useContainer as typeormOrmUseContainer } from 'typeorm'
import { Container as containerTypeorm } from 'typeorm-typedi-extensions'
import { eventDispatcher } from './utlis/eventDispatcher'

routingControllersUseContainer(Container)
typeormOrmUseContainer(containerTypeorm)

// Define port
const port = appConfig.port || 3000

// Create typeorm connection
createConnection().then(async connection => {
    // Load subscribers
    eventDispatcher()

    // Create a new express server instance
    const expressApp: Application = createExpressServer({
        validation: true,
        cors: true,
        classTransformer: true,
        defaultErrorHandler: false,
        routePrefix: appConfig.routePrefix,
        controllers: [__dirname + appConfig.controllersDir],
        middlewares: [__dirname + appConfig.middlewaresDir]
    })

    // Define a route handler for the default home page
    expressApp.get('/', (req, res) => {
        res.send('Hello world!')
    })

    // Start the Express server
    expressApp.listen(port, () => {
        console.log(`🚀 Server started at http://localhost:${port}`)
    })
}).catch(error => console.log('Error: ', error))