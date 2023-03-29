let app = require("express").Router();

let userRoutes = require("./user/user.routes")
let blogRoutes = require("./blog/blog.routes")
let uploadRoutes = require("./user/upload.routes")
let exportRoutes = require("./blog/export.route")


app.use(userRoutes);
app.use(blogRoutes);
app.use(uploadRoutes);
app.use(exportRoutes);

module.exports = app;
