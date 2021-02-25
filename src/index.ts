import 'reflect-metadata'
import { appConfig } from './config/app'
import { dbConfig } from './config/db'
import { Application } from 'express'
import { createExpressServer } from 'routing-controllers'
import { createConnection } from 'typeorm'

// Define port
const port = appConfig.port || 3000

// Create typeorm connection
createConnection({
    type: 'mysql',
    host: dbConfig.typeormHost,
    port: Number(dbConfig.typeormPort),
    username: dbConfig.typeormUsername,
    password: dbConfig.typeormPassword,
    database: dbConfig.typeormDatabase,
    entities: ['src/api/models/**/*.ts'],
    synchronize: Boolean(dbConfig.typeormSynchronize),
    logging: Boolean(dbConfig.typeormLogging)
}).then(async connection => {
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
}).catch(error => console.log('Error: ', error));