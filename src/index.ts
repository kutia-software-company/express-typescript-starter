import 'reflect-metadata'
import { appConfig } from './config/app'
import { Application } from 'express'
import { createExpressServer, useContainer as routingControllersUseContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { createConnection, useContainer as typeormOrmUseContainer } from 'typeorm'
import { Container as containerTypeorm } from 'typeorm-typedi-extensions'
import { eventDispatcher } from './utils/eventDispatcher'
import { createSocketServer, useContainer as socketUseContainer } from 'socket-controllers'
import { registerController as registerCronJobs, useContainer as cronUseContainer } from 'cron-decorators'

routingControllersUseContainer(Container)
typeormOrmUseContainer(containerTypeorm)
socketUseContainer(Container)
cronUseContainer(Container)

// Define port
const port = appConfig.port || 3000

// Create typeorm connection
createConnection().then(async connection => {
    // Load subscribers
    eventDispatcher()

    // Register cron jobs
    if ((appConfig.cronJobsEnabled)) {
        registerCronJobs([__dirname + appConfig.cronJobsDir])
    }

    // Create a new express server instance
    const expressApp: Application = createExpressServer({
        validation: { stopAtFirstError: true },
        cors: true,
        classTransformer: true,
        defaultErrorHandler: false,
        routePrefix: appConfig.routePrefix,
        controllers: [__dirname + appConfig.controllersDir],
        middlewares: [__dirname + appConfig.middlewaresDir]
    })

    // Define a route handler for the default home page
    expressApp.get('/', (req, res) => {
        res.json({ title: appConfig.name, mode: appConfig.node, date: new Date() })
    })

    // Start the Express server
    expressApp.listen(port, () => {
        console.log(`🚀 Server started at http://localhost:${port}`)
    })

    // Socket.io
    createSocketServer(3001, { controllers: [__dirname + appConfig.controllersDir] })
}).catch(error => console.log('Error: ', error))
