// Required Packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const hbs = exphbs.create({});

require("dotenv").config();

// Preparing the Port
const app = express()
const PORT = process.env.PORT ||3001;

/* PASSING MIDDLEWARE */

// Parse application/x-www.urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Parse application .json
app.use(bodyParser.json());
// Static files
app.use(express.static("public"));


// Template engine (Handlebars)
app.engine("hbs", exphbs.engine( {extname: ".hbs" }));
app.set("view engine", "hbs");

// Connection Pool
// const pool = mysql.createPool({
//     connectionLimit : 100,
//     host: process.env.JAWSDB_URL,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });


// pool.getConnection((err, connection) => {
//     if(err) throw err; //not connect
//     console.log("connected as ID " + connection.threadId);
// })



const routes = require("./server/routes/user");
app.use("/", routes);

// Calling the Server
app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});