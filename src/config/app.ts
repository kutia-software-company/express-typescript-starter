import { env } from '../lib/env';

export const appConfig = {
    node: env('NODE_ENV') || 'development',
    isProduction: env('NODE_ENV') === 'production',
    isStaging: env('NODE_ENV') === 'staging',
    isDevelopment: env('NODE_ENV') === 'development',
    name: env('APP_NAME'),
    port: env('APP_PORT'),
    routePrefix: env('APP_ROUTE_PREFIX'),

    controllers: env('CONTROLLERS'),
    middlewares: env('MIDDLEWARES'),
    interceptors: env('INTERCEPTORS')
}