let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let saltrounds = 5;

let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    userName: String, 
    age: Number,
    isActive: {
        type: Boolean,
        default: false
    },
    favTeams: [String],
    userBlogs: [{
        type: mongoose.Types.ObjectId,
        ref: "blogs"
    }]
});


userSchema.methods.display = ()=> {
    console.log("I am a user");
}

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, saltrounds);
    next();
})

userSchema.post("save", async function(){
    console.log("New User Created");
})

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;