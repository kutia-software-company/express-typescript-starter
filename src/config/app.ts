import { env } from '@base/utils/env';
import { toBool } from '@base/utils/to-bool';

function getAppPath() {
  let currentDir = __dirname;
  currentDir = currentDir.replace('/config', '');

  return currentDir;
}

export const appConfig = {
  node: env('NODE_ENV') || 'development',
  isProduction: env('NODE_ENV') === 'production',
  isStaging: env('NODE_ENV') === 'staging',
  isDevelopment: env('NODE_ENV') === 'development',
  name: env('APP_NAME'),
  port: Number(env('APP_PORT')),
  routePrefix: env('APP_ROUTE_PREFIX'),
  url: env('APP_URL'),
  appPath: getAppPath(),

  cronJobsEnabled: toBool(env('ENABLE_CRON_JOBS')),
  graphqlEnabled: toBool(env('ENABLE_GRAPHQL')),

  entitiesDir: env('TYPEORM_ENTITIES_DIR'),
  controllersDir: env('CONTROLLERS_DIR'),
  cronJobsDir: env('CRON_JOBS_DIR'),
  middlewaresDir: env('MIDDLEWARES_DIR'),
  eventsDir: env('EVENTS_DIR'),
  subscribersDir: env('SUBSCRIBERS_DIR'),
  resolversDir: env('RESOLVERS_DIR'),
};
