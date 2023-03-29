const express = require("express");
const app = express();
const cors = require("cors");
const { handleCorsPolicy } = require("../helpers/cors")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
require('dotenv').config();
//let sessionAuth = require("../helpers/session.auth")

let indexRoutes = require("../routes/index.routes");

app.use(express.json());
let connection = require("./database").connection;
connection();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())
app.use(handleCorsPolicy)
//app.use(sessionAuth)
app.use(indexRoutes);


module.exports = app
