let User = require("./user.model")


exports.isExist = async (filter) => {
    const user = await User.findOne(filter);
    if (user) {
        return {
            success: true,
            record: user,
            code: 200
        };
    }
    else {
        return {
            success: false,
            code: 404,
            error: "User is not found!"
        };
    }


}


exports.list = async (filter) => {
    let records = await User.find(filter).select("-password");
    return {
        success: true,
        records,
        code: 200
    };
}


exports.get = async (id) => {
    if (filter) {
        record = await User.find({ _id: id }).select("-password");
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
            error: "User ID is required!"
        }
    }
}


exports.create = async (form) => {
    let user = await this.isExist({ email: form.email });
    if (!user.success) {
        const newUser = new User(form);
        await newUser.save();
        return {
            success: true,
            record: newUser,
            code: 201
        };
    }
    else {
        return {
            success: false,
            code: 404,
            error: "User ID is Already exists"
        }
    }
}


exports.update = async (id, form) => {
    await User.findByIdAndUpdate({ _id: id }, form);
    let userUpdate = await this.isExist({ _id: id });
    return {
        success: true,
        record: userUpdate.record,
        code: 201
    };
}


exports.remove = async (id) => {
    const user = await this.isExist({ _id: id });
    if (_id && user.success) {
        await User.findByIdAndDelete({ _id: id })
        return {
            success: true,
            code: 200
        };
    }
    else {
        return {
            success: false,
            error: user.error,
            code: 404
        };
    }
}
