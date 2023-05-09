// importing packages and files
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// set up the environment variables
const PORT = process.env.port || 3001;
const app = express;

// middleware setup

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import routes

app.use(routes)

// set up connection to the MongoDB db and server start

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
    })
})
