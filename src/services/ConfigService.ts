import { LoggerService } from '../logger/LoggerService';
import { EnvService } from './EnvService';

export interface AppConfig {
  app: {
    name: string;
    version: string;
    port: number;
    env: string;
  };
  database: {
    url?: string;
    host?: string;
    port?: number;
    name?: string;
    username?: string;
    password?: string;
  };
  auth: {
    jwtSecret?: string;
    jwtExpiresIn: string;
  };
  logging: {
    level: string;
    enableColors: boolean;
    enableTimestamp: boolean;
  };
}

export class ConfigService {
  private logger: LoggerService;
  private envService: EnvService;
  private config: AppConfig;

  constructor(logger?: LoggerService) {
    this.logger = logger || new LoggerService({ module: 'ConfigService' });
    this.envService = new EnvService(this.logger);
    this.config = this.loadConfig();
  }

  private loadConfig(): AppConfig {
    this.logger.debug('Loading application configuration');

    const config: AppConfig = {
      app: {
        name: this.envService.get('APP_NAME', 'RocketCode App'),
        version: this.envService.get('APP_VERSION', '1.0.0'),
        port: this.envService.getPort(),
        env: this.envService.getNodeEnv(),
      },
      database: {
        url: this.envService.get('DATABASE_URL'),
        host: this.envService.get('DB_HOST', 'localhost'),
        port: this.envService.getNumber('DB_PORT', 5432),
        name: this.envService.get('DB_NAME', 'rocketcode'),
        username: this.envService.get('DB_USERNAME'),
        password: this.envService.get('DB_PASSWORD'),
      },
      auth: {
        jwtSecret: this.envService.get('JWT_SECRET'),
        jwtExpiresIn: this.envService.get('JWT_EXPIRES_IN', '7d'),
      },
      logging: {
        level: this.envService.get('LOG_LEVEL', 'info'),
        enableColors: this.envService.getBoolean('LOG_ENABLE_COLORS', true),
        enableTimestamp: this.envService.getBoolean('LOG_ENABLE_TIMESTAMP', true),
      },
    };

    this.logger.info('Configuration loaded successfully', { 
      appName: config.app.name,
      env: config.app.env,
      port: config.app.port 
    });

    return config;
  }

  get(): AppConfig {
    return this.config;
  }

  getApp(): AppConfig['app'] {
    return this.config.app;
  }

  getDatabase(): AppConfig['database'] {
    return this.config.database;
  }

  getAuth(): AppConfig['auth'] {
    return this.config.auth;
  }

  getLogging(): AppConfig['logging'] {
    return this.config.logging;
  }

  validate(): void {
    this.logger.debug('Validating configuration');

    const requiredEnvVars = ['JWT_SECRET'];
    
    if (!this.envService.isDevelopment()) {
      this.envService.validateRequired(requiredEnvVars);
    }

    this.logger.info('Configuration validation completed');
  }

  reload(): void {
    this.logger.info('Reloading configuration');
    this.config = this.loadConfig();
  }
} 