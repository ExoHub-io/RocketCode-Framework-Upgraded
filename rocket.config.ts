import { AppConfig } from './src/services/ConfigService';

const config: AppConfig = {
  app: {
    name: 'RocketCode Framework',
    version: '1.0.0',
    port: 3000,
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    name: process.env.DB_NAME || 'rocketcode',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableColors: process.env.LOG_ENABLE_COLORS !== 'false',
    enableTimestamp: process.env.LOG_ENABLE_TIMESTAMP !== 'false',
  },
};

export default config; 