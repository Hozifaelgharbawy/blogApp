let app = require("express").Router();
let blogController = require("../controller/blog.controller");
let checkToken = require("../helpers/token.auth").verifyToken

app.post("/addBlog", blogController.addBlog);
app.delete("/deleteBlog/:blogId/:userId", blogController.deleteBlog);
app.put("/updateBlog/:blogId", blogController.updateBlog);
app.get("/getAllBlogs", checkToken, blogController.getAllBlogs);
app.get("/getBlogById/:id", blogController.getBlogById);
app.get("/getAllBlogsPaginated", blogController.getAllBlogsPaginated);

module.exports = app;