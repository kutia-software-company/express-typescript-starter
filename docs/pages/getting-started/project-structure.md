# Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **dist/**                         | Compiled source files will be placed here |
| **src/**                          | Source files |
| **src/config**                    | The config directory, as the name implies, contains all of your application's configuration files. |
| **src/api/controllers/**          | REST API Controllers |
| **src/api/responses**             | Response classes or interfaces to type json response bodies  |
| **src/api/exceptions/**           | Custom HttpErrors like 404 NotFound |
| **src/api/models/**               | TypeORM Models |
| **src/api/repositories/**         | Repository / DB layer |
| **src/api/services/**             | Service layer |
| **src/api/events/**               | Events |
| **src/api/requests/**             | Request classes with validation rules if the body is not equal with a model |
| **src/api/transformers/**         | Class-transformer allows you to transform plain object to some instance of class and versa |
| **src/api/cron-jobs/**            | Cron Jobs |
| **src/api/resolvers/**            | GraphQL resolvers (query, mutation & field-resolver) |
| **src/api/types/**                | GraphQL types, input-types and scalar types |
| **src/api/queue-jobs/**           | Queue Jobs |
| **src/infrastructure/**           | App Infrastructure |
| **src/infrastructure/middlewares/** | Express Middlewares |
| **src/database/factories**        | Factory the generate fake entities |
| **src/database/migrations**       | Database migration scripts |
| **src/database/seeds**            | Seeds to create some data in the database |
| **src/decorators/**               | Custom decorators like @EventDispatch |
| **src/public/**                   | Static assets (fonts, css, js, img). |
| **.env.example**                  | Environment configurations |
