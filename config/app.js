const express = require("express");
const app = express();
const cors = require("cors");
const { handleCorsPolicy } = require("../helpers/cors")
require('dotenv').config();
//let sessionAuth = require("../helpers/session.auth")

let indexRoutes = require("../routes/index.routes");

app.use(express.json());
let connection = require("./database").connection;
connection();


app.use(cors())
app.use(handleCorsPolicy)
//app.use(sessionAuth)
app.use(indexRoutes);


module.exports = app
