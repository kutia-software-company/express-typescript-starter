import * as dotenv from 'dotenv'
dotenv.config() // { path: `.env.${process.env.NODE_ENV}` }

export function env(key: string): string {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string
}