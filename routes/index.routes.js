let app = require("express").Router();

let userRoutes = require("./user/user.routes")
let blogRoutes = require("./blog/blog.routes")


app.use(userRoutes);
app.use(blogRoutes);

module.exports = app;
