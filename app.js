const express = require("express");
const app = express();
const cors = require("cors");
const { handleCorsPolicy } = require("./helpers/cors")
require('dotenv').config();
let sessionAuth = require("./helpers/session.auth")

let userRoutes = require("./routes/user.routes");
let blogRoutes = require("./routes/blog.routes");

app.use(express.json());
let connection = require("./config/db.connection");
connection();


app.use(cors())
app.use(handleCorsPolicy)
app.use(sessionAuth)
app.use(userRoutes);
app.use(blogRoutes);

app.listen(process.env.PORT, () => { console.log(`Server is up and running on port ${process.env.PORT}`); })

