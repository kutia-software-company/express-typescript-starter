import glob from 'glob';
import { appConfig } from '@base/config/app';

/**
 * This loads all the created subscribers into the project, so we do not have to import them manually.
 */
export function loadEventDispatcher() {
  const patterns = appConfig.appPath + appConfig.eventsDir;

  glob(patterns, (err: any, files: string[]) => {
    for (const file of files) {
      require(file);
    }
  });
}
