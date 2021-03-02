import { env } from '../lib/env'

function getAppPath() {
    let currentDir = __dirname
    currentDir = currentDir.replace('/config', '')

    return currentDir
}

export const appConfig = {
    node: env('NODE_ENV') || 'development',
    isProduction: env('NODE_ENV') === 'production',
    isStaging: env('NODE_ENV') === 'staging',
    isDevelopment: env('NODE_ENV') === 'development',
    name: env('APP_NAME'),
    port: env('APP_PORT'),
    routePrefix: env('APP_ROUTE_PREFIX'),
    jwtSecret: env('JWT_SECRET'),

    entities: env('ENTITIES'),
    controllers: env('CONTROLLERS'),
    middlewares: env('MIDDLEWARES'),
    interceptors: env('INTERCEPTORS'),
    subscribers: env('SUBSCRIBERS'),

    appPath: getAppPath(),
}