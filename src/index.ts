import 'reflect-metadata'
import { appConfig } from './config/app'
import { Application } from 'express'
import { createExpressServer } from 'routing-controllers'

// Define port
const port = appConfig.port || 3000

// Create a new express server instance
const expressApp: Application = createExpressServer({
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