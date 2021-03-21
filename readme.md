# Introduction

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
- **Easy event dispatching** thanks to [event-dispatch](https://github.com/pleerock/event-dispatch).
- **Fast Database Building** with simple migration from [TypeORM](https://github.com/typeorm/typeorm).
- **Easy Data Seeding** with our own factories.
- **Auth System** thanks to [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).
- **Docker** thanks to [docker](https://github.com/docker).
- **Class-based to handle websocket events** thanks to [socket-controllers](https://github.com/typestack/socket-controllers).
- **Class-based to handle Cron Jobs** thanks to [cron-decorators](https://github.com/mrbandler/cron-decorators).
- **API Documentation** thanks to [swagger](http://swagger.io/) and [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi).

### Installation

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install a MySQL database.

> If you work with a mac, i recommend to use [DBngin](https://dbngin.com) for the installation.

### Step 2: Create new Project

Clone or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env` file.

Then setup your application environment.

```bash
npm install
```

> This installs all dependencies with npm. So after that your development environment is ready to use.

### Step 3: Serve your App

Go to the project dir and start your app with this npm script.

```bash
npm run dev
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://localhost:3000`.

### Docker

Docker is a platform for developers and sysadmins to build, run, and share applications with containers.

- Starts the containers in the background and leaves them running: `docker-compose up -d`.
- Stops containers and removes containers, networks, volumes, and images: `docker-compose down`.

### API Routes

The route prefix is `/api` by default, but you can change this in the .env file.

| Route          | Description |
| -------------- | ----------- |
| **/**          | Home page |
| **/api/login** | Login |
| **/api/users** | Example entity endpoint |
| **/docs**      | This is the Swagger UI with our API documentation |

### Database Migration

- Run `npm run typeorm migration:create {name}` to create a new migration file.
- To migrate your database run `npm run typeorm migration:run`.

### Running Seeders

- You may execute the `npm run seed:run` command to seed your database.

### Enable Cron Jobs

To enable cron jobs you just need to update your env file by set `ENABLE_CRON_JOBS` to `true`.

### Pagination & Sort

Pagination and Sort are implemented on method `getAll` for `Users`, try to send an api like this: `http://localhost:3000/api/users?limit=10&page=1&sortByDesc=id`.

### Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **dist/**                         | Compiled source files will be placed here |
| **src/**                          | Source files |
| **src/config**                    | The config directory, as the name implies, contains all of your application's configuration files. |
| **src/api/controllers/**          | REST API Controllers |
| **src/api/responses**             | Response classes or interfaces to type json response bodies  |
| **src/api/exceptions/**           | Custom HttpErrors like 404 NotFound |
| **src/api/middlewares/**          | Express Middlewares |
| **src/api/models/**               | TypeORM Models |
| **src/api/repositories/**         | Repository / DB layer |
| **src/api/services/**             | Service layer |
| **src/api/subscribers/**          | Event subscribers |
| **src/api/requests/**             | Request classes with validation rules if the body is not equal with a model |
| **src/api/transformers/**         | Class-transformer allows you to transform plain object to some instance of class and versa |
| **src/api/cron-jobs/**            | Cron Jobs |
| **src/database/factories**        | Factory the generate fake entities |
| **src/database/migrations**       | Database migration scripts |
| **src/database/seeds**            | Seeds to create some data in the database |
| **src/decorators/**               | Custom decorators like @EventDispatch |
| **src/public/**                   | Static assets (fonts, css, js, img). |
| **.env.example**                  | Environment configurations |

### License

[MIT](/LICENSE)
