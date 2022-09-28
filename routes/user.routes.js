let app = require("express").Router();
let userController = require("../controller/user.controller");
let { confirmPasswordValidation, addUserValidation } = require("../validation/user.validation");
let validator = require("../helpers/common.validate");
let { checkSession } = require("../utils/checkSession.util")


app.post("/register", userController.register);
app.get("/activateUser/:token", userController.activateUser);

app.post("/login", validator(confirmPasswordValidation), userController.login);

app.post("/generateRecoveryCode", userController.generateRecoveryCode)
app.post("/checkRecoveryCode", userController.checkRecoveryCode)


app.get("/getAllUsers", checkSession, userController.getAllUsers);
app.get("/getUserById/:id", checkSession,userController.getUserById);
app.put("/updateUser/:id", userController.updateUser);
app.delete("/deleteUser/:id", userController.deleteUser);
app.get("/getUserBlogs/:id", userController.getUserBlogs);


module.exports = app;