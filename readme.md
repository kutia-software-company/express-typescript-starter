### Introduction

Project is a faster way to building a Node.js RESTful API in TypeScript.

Start use now and just focus on your business and not spending hours in project configuration.

### Features

- **Beautiful Code** thanks to the awesome annotations of the libraries from [pleerock](https://github.com/pleerock).
- **Dependency Injection** done with the nice framework from [TypeDI](https://github.com/pleerock/typedi).
- **Simplified Database Query** with the ORM [TypeORM](https://github.com/typeorm/typeorm).
- **Clear Structure** with different layers such as controllers, services, repositories, models, middlewares...
- **Easy Exception Handling** thanks to [routing-controllers](https://github.com/pleerock/routing-controllers).
- **Smart Validation** thanks to [class-validator](https://github.com/pleerock/class-validator) with some nice annotations.
- **Custom Validators** to validate your request even better and stricter ([custom-validation-classes](https://github.com/pleerock/class-validator#custom-validation-classes)).
- **Basic Security Features** thanks to [Helmet](https://helmetjs.github.io/).
- **Authentication and Authorization** thanks to [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).
- **CLI Commands** thanks to [yargs](https://github.com/yargs/yargs).
- **Easy event dispatching** thanks to [event-dispatch](https://github.com/pleerock/event-dispatch).
- **Fast Database Building** with simple migration from [TypeORM](https://github.com/typeorm/typeorm).
- **Easy Data Seeding** with our own factories.
- **Auth System** thanks to [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).
- **Docker** thanks to [docker](https://github.com/docker).
- **Class-based to handle websocket events** thanks to [socket-controllers](https://github.com/typestack/socket-controllers).
- **Class-based to handle Cron Jobs** thanks to [cron-decorators](https://github.com/mrbandler/cron-decorators).
- **API Documentation** thanks to [swagger](http://swagger.io/) and [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi).
- **GraphQL** thanks to [TypeGraphQL](https://19majkel94.github.io/type-graphql/) we have a some cool decorators to simplify the usage of GraphQL.
- **Queue Jobs** thanks to [BullMQ](https://github.com/taskforcesh/bullmq).
- **Query Parser** thanks to [Typeorm Query Parser](https://github.com/gentritabazi01/typeorm-simple-query-parser).

### Project Structure
```dist/                       Compiled source files will be placed here
src/                        Source files
|-- config/                 The config directory, as the name implies, contains all of your application's configuration files.
|-- api/
|   |-- controllers/        REST API Controllers
|   |-- responses/          Response classes or interfaces to type JSON response bodies
|   |-- exceptions/         Custom HttpErrors like 404 NotFound
|   |-- models/             TypeORM Models
|   |-- repositories/       Repository / DB layer
|   |-- services/           Service layer
|   |-- events/             Events
|   |-- requests/           Request classes with validation rules if the body is not equal with a model
|   |-- transformers/       Class-transformer allows you to transform plain object to some instance of class and versa
|   |-- cron-jobs/          Cron Jobs
|   |-- resolvers/          GraphQL resolvers (query, mutation & field-resolver)
|   |-- types/              GraphQL types, input-types and scalar types
|   |-- queue-jobs/         Queue Jobs
|-- infrastructure/         App Infrastructure
|   |-- middlewares/        Express Middlewares
|-- database/
|   |-- factories/          Factory to generate fake entities
|   |-- migrations/         Database migration scripts
|   |-- seeds/              Seeds to create some data in the database
|-- decorators/             Custom decorators like @EventDispatch
|-- public/                 Static assets (fonts, css, js, img).
.env.example               Environment configurations
```


### Documentation

https://kutia-software-company.github.io/express-typescript-starter

### License

[MIT](/LICENSE)
