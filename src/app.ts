import express from "express";
import { appConfig } from './config/app'

const app = express()
const port = appConfig.port || 3000

console.log(appConfig)

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});