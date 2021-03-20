import 'reflect-metadata'
import { appConfig } from './config/app'
import { useContainer as routingControllersUseContainer, useExpressServer } from 'routing-controllers'
import { Container } from 'typedi'
import { createConnection, useContainer as typeormOrmUseContainer } from 'typeorm'
import { Container as containerTypeorm } from 'typeorm-typedi-extensions'
import { eventDispatcher } from './utils/eventDispatcher'
import { useSocketServer, useContainer as socketUseContainer } from 'socket-controllers'
import { registerController as registerCronJobs, useContainer as cronUseContainer } from 'cron-decorators'
import * as path from 'path'
import express from 'express'

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
        
        server.listen(this.port, () => console.log(`🚀 Server started at http://localhost:${this.port}`))

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
}

new App