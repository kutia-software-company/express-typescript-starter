import glob from 'glob'
import { appConfig } from '../config/app'

/**
 * This loads all the created subscribers into the project, so we do not have to import them manually.
 */
export function eventDispatcher() {
    const patterns = appConfig.appPath + appConfig.subscribersDir

    glob(patterns, (err: any, files: string[]) => {
        for (const file of files) {
            require(file)
        }
    })
}