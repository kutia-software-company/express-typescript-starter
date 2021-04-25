import Helmet from 'helmet';
import express from 'express';

export function loadHelmet(app: express.Application) {
  return app.use(
    Helmet({
      /**
       * Default helmet policy + own customizations - graphiql support
       * https://helmetjs.github.io/
       */
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [
            "'self'",
            /** @by-us - adds graphiql support over helmet's default CSP */
            "'unsafe-inline'",
          ],
          baseUri: ["'self'"],
          blockAllMixedContent: [],
          fontSrc: ["'self'", 'https:', 'data:'],
          frameAncestors: ["'self'"],
          imgSrc: ["'self'", 'data:'],
          objectSrc: ["'none'"],
          scriptSrc: [
            "'self'",
            /** @by-us - adds graphiql support over helmet's default CSP */
            "'unsafe-inline'",
            /** @by-us - adds graphiql support over helmet's default CSP */
            "'unsafe-eval'",
          ],
          upgradeInsecureRequests: [],
        },
      },
    }),
  );
}
