const dotenv = require('dotenv');

dotenv.config();

const WHITELIST = {
  users: {
    create: ['first_name', 'last_name', 'email', 'password']
  }
};

const configObj = {
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  ALLOWED_DOMAIN: process.env.DASHBOARD_APP_ORIGIN,
  DATABASE_URL: process.env.MONGO_URL,
};

const defaultConfig = {
  PORT: process.env.PORT || 9000,
  WHITELIST
};

module.exports = {
  ...defaultConfig,
  ...configObj
};
