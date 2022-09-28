let mongoose = require("mongoose");

let blogSchema = mongoose.Schema({
    title: String,
    description: String,
});

let blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;