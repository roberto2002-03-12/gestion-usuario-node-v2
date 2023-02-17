const multer = require('multer');

const storageImages = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imagenes')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({
    storage: storageImages
});

module.exports = upload;