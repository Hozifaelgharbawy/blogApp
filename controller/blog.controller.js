let Blog = require("../modules/blog/blog.model");
let blogRepo = require("../modules/blog/blog.repo");
let User = require("../modules/user/user.model");

exports.addBlog = async (req, res) => {
    const result = await blogRepo.create(req.body)
    res.status(result.code).json(result);
}

exports.deleteBlog = async (req, res) => {
    const result = await blogRepo.remove(req.params.blogId)

    if (result.success) {
        res.status(result.code).json(result);
        await User.findByIdAndUpdate({ _id: req.params.userId }, { $pull: { userBlogs: req.params.blogId } });
    }
    else {
        res.status(result.code).json(result);
    }
}

exports.updateBlog = async (req, res) => {
    const result = await blogRepo.update(req.params.blogId,req.body)
    res.status(result.code).json(result);
}

exports.getAllBlogs = async (req, res) => {
    let result = await blogRepo.list();
    res.status(result.code).json(result);
}

exports.getBlogById = async (req, res) => {
    let result = await blogRepo.get(req.params.id);
    if (result.success) {
        res.status(result.code).json(result);
    }
    else {
        res.status(result.code).json(result);
    }
}

exports.getAllBlogsPaginated = async (req, res) => {
    let { size, page } = req.query;
    let limit = parseInt(size);
    let skip = (page - 1) * limit;
    let allBlogs = await Blog.find({}).limit(limit).skip(skip);
    let allBlogsCount = await Blog.find({}).count();
    res.status(200).send({ message: "Success", allBlogsCount, allBlogs });
}
