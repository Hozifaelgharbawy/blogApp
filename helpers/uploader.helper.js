let multer = require('multer');


exports.uploadImage = (folderName) => {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + Math.random() + '.jpg')
    }
  })

  return multer({storage: storage})
}