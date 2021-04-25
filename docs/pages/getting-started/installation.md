# Installation

#### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install a MySQL database.

> If you work with a mac, i recommend to use [DBngin](https://dbngin.com) for the installation.

#### Step 2: Create new Project

Clone or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env` file.

Then setup your application environment.

```console
npm install
```

> This installs all dependencies with npm. So after that your development environment is ready to use.

#### Step 3: Serve your App

Go to the project dir and start your app with this npm script.

```console
npm run dev
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://localhost:3000`.
