import { env } from '../utils/env'
import { toBool } from '../utils/to-bool'

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
    port: Number(env('APP_PORT')),
    routePrefix: env('APP_ROUTE_PREFIX'),
    jwtSecret: env('JWT_SECRET'),
    appPath: getAppPath(),

    cronJobsEnabled: toBool(env('ENABLE_CRON_JOBS')),

    entitiesDir: env('TYPEORM_ENTITIES_DIR'),
    controllersDir: env('CONTROLLERS_DIR'),
    cronJobsDir: env('CRON_JOBS_DIR'),
    middlewaresDir: env('MIDDLEWARES_DIR'),
    subscribersDir: env('SUBSCRIBERS_DIR')
}