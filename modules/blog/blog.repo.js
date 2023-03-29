let Blog = require("./blog.model")


exports.isExist = async (filter) => {
  const blog = await Blog.findOne(filter);
  if (blog) {
    return {
      success: true,
      record: blog,
      code: 200
    };
  }
  else {
    return {
      success: false,
      code: 404,
      error: "blog is not found!"
    };
  }


}


exports.list = async (filter) => {
  let records = await Blog.find(filter);
  return {
    success: true,
    records,
    code: 200
  };
}


exports.get = async (id) => {
  if (filter) {
    record = await Blog.find({ _id: id });
    return {
      success: true,
      record,
      code: 200
    };
  }
  else {
    return {
      success: false,
      code: 404,
      error: "Blog ID is required!"
    }
  }
}


exports.create = async (form) => {
  const newBlog = new Blog(form);
  await newBlog.save();
  return {
    success: true,
    record: newBlog,
    code: 201
  };

}


exports.update = async (id, form) => {
  await Blog.findByIdAndUpdate({ _id: id }, form);
  let blogUpdate = await this.isExist({ _id: id });
  return {
    success: true,
    record: blogUpdate.record,
    code: 201
  };
}


exports.remove = async (id) => {
  const blog = await this.isExist({ _id: id });
  if (_id && blog.success) {
    await Blog.findByIdAndDelete({ _id: id })
    return {
      success: true,
      code: 200
    };
  }
  else {
    return {
      success: false,
      error: blog.error,
      code: 404
    };
  }
}
