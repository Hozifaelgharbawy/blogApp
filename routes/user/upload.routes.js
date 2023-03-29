let app = require("express").Router();
let uploadController = require("../../controller/upload.controller");
const { uploadImage } = require("../../helpers/uploader.helper")
const upload = uploadImage("users")

app.put("/image", upload.array('image', 1), uploadController.uploadImage)



module.exports = app;