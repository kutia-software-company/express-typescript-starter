import { env } from '../lib/env';

export const dbConfig = {
    typeormConnection: env('TYPEORM_CONNECTION'),
    typeormHost: env('TYPEORM_HOST'),
    typeormPort: env('TYPEORM_PORT'),
    typeormUsername: env('TYPEORM_USERNAME'),
    typeormPassword: env('TYPEORM_PASSWORD'),
    typeormDatabase: env('TYPEORM_DATABASE'),
    typeormSynchronize: env('TYPEORM_SYNCHRONIZE'),
    typeormLogging: env('TYPEORM_LOGGING'),
    typeormLogger: env('TYPEORM_LOGGER'),
    typeormEntities: env('TYPEORM_ENTITIES'),
    typeormMigrations: env('TYPEORM_MIGRATIONS'),
}