require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || 'localhost',

  // Database
  MONGODB_URI:
    process.env.MONGODB_URI || 'mongodb://localhost:27017/sentinel-flag',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // Environments
  SUPPORTED_ENVIRONMENTS: (process.env.SUPPORTED_ENVIRONMENTS || 'Dev,Staging,Prod').split(
    ','
  ),

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
};
