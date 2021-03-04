import { env } from '../utlis/env';

export const dbConfig = {
    dbConnection: env('DB_CONNECTION'),
    dbHost: env('DB_HOST'),
    dbPort: env('DB_PORT'),
    dbDatabase: env('DB_DATABASE'),
    dbUsername: env('DB_USERNAME'),
    dbPassword: env('DB_PASSWORD')
}