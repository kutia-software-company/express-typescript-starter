import 'reflect-metadata'
import { appConfig } from './config/app'
import { useContainer as routingControllersUseContainer, useExpressServer, getMetadataArgsStorage } from 'routing-controllers'
import { Container } from 'typedi'
import { createConnection, useContainer as typeormOrmUseContainer } from 'typeorm'
import { Container as containerTypeorm } from 'typeorm-typedi-extensions'
import { eventDispatcher } from './utils/eventDispatcher'
import { useSocketServer, useContainer as socketUseContainer } from 'socket-controllers'
import { registerController as registerCronJobs, useContainer as cronUseContainer } from 'cron-decorators'
import * as path from 'path'
import express from 'express'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import * as swaggerUiExpress from 'swagger-ui-express'

export class App {
    private app: express.Application = express()
    private port: Number = appConfig.port

    public constructor() {
        this.bootstrap()
    }

    public async bootstrap() {
        this.useContainers()
        await this.typeOrmCreateConnection()
        this.registerEvents()
        this.registerCronJobs()
        this.serveStaticFiles()
        this.registerSocketControllers()
        this.registerRoutingControllers()
        this.registerDefaultHomePage()
        this.setupSwagger()
    }

    private useContainers() {
        routingControllersUseContainer(Container)
        typeormOrmUseContainer(containerTypeorm)
        socketUseContainer(Container)
        cronUseContainer(Container)
    }

    private async typeOrmCreateConnection() {
        return await createConnection()
    }

    private registerEvents() {
        return eventDispatcher()
    }

    private registerCronJobs() {
        if (!appConfig.cronJobsEnabled) {
            return false
        }

        registerCronJobs([__dirname + appConfig.cronJobsDir])
    }

    private serveStaticFiles() {
        this.app.use('/public', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
    }

    private registerSocketControllers() {
        const server = require('http').Server(this.app)
        const io = require('socket.io')(server)

        this.app.use(function(req: any, res: any, next) {
            req.io = io
            next()
        })
        
        server.listen(this.port, () => console.log(`🚀 Server started at http://localhost:${this.port}\n🚨️ Environment: ${process.env.NODE_ENV}`))

        useSocketServer(io, { controllers: [__dirname + appConfig.controllersDir] })
    }

    private registerRoutingControllers() {
        useExpressServer(this.app, {
            validation: { stopAtFirstError: true },
            cors: true,
            classTransformer: true,
            defaultErrorHandler: false,
            routePrefix: appConfig.routePrefix,
            controllers: [__dirname + appConfig.controllersDir],
            middlewares: [__dirname + appConfig.middlewaresDir]
        })
    }

    private registerDefaultHomePage() {
        this.app.get('/', (req, res) => {
            res.json({ title: appConfig.name, mode: appConfig.node, date: new Date() })
        })
    }

    private setupSwagger() {
        // Parse class-validator classes into JSON Schema
        const schemas = validationMetadatasToSchemas({
            refPointerPrefix: '#/components/schemas/'
        })

        // Parse routing-controllers classes into OpenAPI spec:
        const storage = getMetadataArgsStorage()
        const spec = routingControllersToSpec(storage, {}, {
            components: {
                schemas,
                securitySchemes: {
                    basicAuth: {
                        scheme: 'basic',
                        type: 'http',
                    },
                }
            },
            info: {
                description: 'Welcome to the club!',
                title: 'API Documentation',
                version: '1.0.0',
            }
        })

        // Use Swagger
        this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))
    }
}

new App