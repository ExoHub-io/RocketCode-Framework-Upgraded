import { LoggerService } from '../logger/LoggerService';
import { LogLevel } from '../logger/types';
import { ConfigService } from '../services/ConfigService';
import { DatabaseService } from '../services/DatabaseService';
import { RocketApp, AppOptions } from './types';

export function createApp(options: AppOptions = {}): RocketApp {
  const appName = options.name || 'RocketCode App';
  const appVersion = options.version || '1.0.0';
  
  // Create logger with specified level
  const logLevel = options.logLevel ? LogLevel[options.logLevel.toUpperCase() as keyof typeof LogLevel] : LogLevel.INFO;
  const logger = new LoggerService({ 
    module: appName,
    level: logLevel 
  });

  // Create config service
  const config = new ConfigService(logger);

  // Create database service if enabled
  let database: DatabaseService | undefined;
  if (options.enableDatabase) {
    database = new DatabaseService(logger, config);
  }

  const app: RocketApp = {
    name: appName,
    version: appVersion,
    logger,
    config,
    database,
    modules: [],
    components: [],

    async start(): Promise<void> {
      try {
        this.logger.info(`Starting ${this.name} v${this.version}`);
        
        // Validate configuration
        this.config.validate();
        
        // Connect to database if available
        if (this.database) {
          await this.database.connect();
        }
        
        // Initialize modules
        for (const module of this.modules) {
          await module.init();
        }
        
        // Initialize components
        for (const component of this.components) {
          await component.init();
        }
        
        this.logger.info(`${this.name} started successfully`);
      } catch (error: any) {
        this.logger.error(`Failed to start ${this.name}`, { error: error.message });
        throw error;
      }
    },

    async stop(): Promise<void> {
      try {
        this.logger.info(`Stopping ${this.name}`);
        
        // Destroy components
        for (const component of this.components) {
          await component.destroy();
        }
        
        // Destroy modules
        for (const module of this.modules) {
          await module.destroy();
        }
        
        // Disconnect from database if available
        if (this.database) {
          await this.database.disconnect();
        }
        
        this.logger.info(`${this.name} stopped successfully`);
      } catch (error: any) {
        this.logger.error(`Failed to stop ${this.name}`, { error: error.message });
        throw error;
      }
    }
  };

  return app;
} 