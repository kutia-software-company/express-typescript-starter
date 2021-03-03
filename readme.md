# Introduction

Project is a faster way to building a Node.js RESTful API in TypeScript.

Start use now and just focus on your business and not spending hours in project configuration.

### Features

- **Beautiful Code** thanks to the awesome annotations of the libraries from [pleerock](https://github.com/pleerock).
- **Dependency Injection** done with the nice framework from [TypeDI](https://github.com/pleerock/typedi).
- **Simplified Database Query** with the ORM [Sequelize](https://github.com/sequelize/sequelize).
- **Clear Structure** with different layers such as controllers, services, repositories, models, middlewares...
- **Easy Exception Handling** thanks to [routing-controllers](https://github.com/pleerock/routing-controllers).
- **Smart Validation** thanks to [class-validator](https://github.com/pleerock/class-validator) with some nice annotations.
- **Custom Validators** to validate your request even better and stricter ([custom-validation-classes](https://github.com/pleerock/class-validator#custom-validation-classes)).
- **Basic Security Features** thanks to [Helmet](https://helmetjs.github.io/).
- **Easy event dispatching** thanks to [event-dispatch](https://github.com/pleerock/event-dispatch).
- **Fast Database Building** with simple migration from [Sequelize](https://github.com/sequelize/sequelize).
- **Easy Data Seeding** with our own factories.
- **Auth System** thanks to [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).

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


### API Routes

The route prefix is `/api` by default, but you can change this in the .env file.

| Route          | Description |
| -------------- | ----------- |
| **/api/users** | Example entity endpoint |

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
| **src/api/models/**               | Sequelize Models |
| **src/api/repositories/**         | Repository / DB layer |
| **src/api/services/**             | Service layer |
| **src/api/subscribers/**          | Event subscribers |
| **src/api/validators/**           | Request classes with validation rules if the body is not equal with a model |
| **src/database/factories**        | Factory the generate fake entities |
| **src/database/migrations**       | Database migration scripts |
| **src/database/seeds**            | Seeds to create some data in the database |
| **src/decorators/**               | Custom decorators like @EventDispatch |
| **src/public/**                   | Static assets (fonts, css, js, img). |
| **.env.example**                  | Environment configurations |

### License

[MIT](/LICENSE)