require('dotenv').config();

const config = {
    port: process.env.PORT || 3001,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    emailRecype: process.env.EMAIL_RECYPE,
    passRecype: process.env.PASS_RECYPE,
    awsAccessKey:  '',
    awsAccessId:  '',
    awsBucket:  'ucvcid-test-1',
    awsRegion:  'sa-east-1'
};

module.exports = {config};