let Blog = require("../model/blog.model");
let User = require("../model/user.model");

exports.addBlog = async (req, res) => {
    let blog = new Blog(req.body);
    await blog.save();
    await User.findByIdAndUpdate({_id: req.params.userId}, {$push: {userBlogs: blog._id}});
    res.status(200).send({message: "Success"});
}

exports.deleteBlog = async (req, res) => {
    await Blog.deleteOne({_id: req.params.blogId});
    await User.findByIdAndUpdate({_id: req.params.userId}, {$pull: {userBlogs: req.params.blogId}});
    res.status(200).send({message: "Success"});
}

exports.updateBlog = async (req, res) => {
    await Blog.findByIdAndUpdate({_id: req.params.blogId}, req.body);
    res.status(200).send({message: "Success"});
}

exports.getAllBlogs = async (req, res) => {
    let allBlogs = await Blog.find({});
    res.status(200).send({message: "Success", allBlogs});
}

exports.getBlogById = async(req,res) => {
    let blog = await Blog.find({_id: req.params.id});
    res.status(200).send({message: "Success", blog: blog[0]});
}

exports.getAllBlogsPaginated = async (req,res) => {
    let {size, page} = req.query;
    let limit = parseInt(size);
    let skip = (page - 1) * limit;
    let allBlogs = await Blog.find({}).limit(limit).skip(skip);
    let allBlogsCount = await Blog.find({}).count();
    res.status(200).send({message: "Success",allBlogsCount, allBlogs});
}
