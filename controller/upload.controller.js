let user = require("../modules/user/user.repo");
exports.uploadImage = async (req, res) => {
  try {
    let image = req.files;
    console.log(Date.now()+ Math.random() + '.jpg');
    const result = await user.isExist({ _id: req.body._id })
    let oldImage = result.record.image
    if (oldImage) {
      try {
        await fs.unlinkSync(oldImage.path);
      }
      catch (err) {
        console.log(`err`, err.errno);
      }
    }
    const update = await user.update(req.body._id, { image: image[0] });
    res.status(update.code).json({ success: update.success, record: update.record.image, code: update.code });
  } catch (err) {
    console.log(`err.message`, err.message);
    res.status(500).json({ error: "Unexpected Error!" });
  }
}