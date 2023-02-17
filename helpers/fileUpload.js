require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        bucket: process.env.AWS_BUCKET_NAME,
        s3: s3,
        acl: 'public-read',
        key: (req, file, cb) => {
            if (!file) return;
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
        }
    })
});

module.exports = upload;