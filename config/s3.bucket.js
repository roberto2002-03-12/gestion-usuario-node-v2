require('dotenv').config();
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
});

console.log('conectado a aws');

module.exports = {aws};