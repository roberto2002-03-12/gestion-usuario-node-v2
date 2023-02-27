const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);//:${config.dbPort}
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}`;

module.exports = {
    development: {
        url: URI,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    },
    production: {
        url: URI,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
};