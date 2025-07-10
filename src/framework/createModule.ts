import { LoggerService } from '../logger/LoggerService';
import { RocketModule, ModuleOptions } from './types';

export function createModule(options: ModuleOptions): RocketModule {
  const moduleName = options.name;
  const moduleVersion = options.version || '1.0.0';
  
  const logger = new LoggerService({ 
    module: moduleName 
  });

  const module: RocketModule = {
    name: moduleName,
    version: moduleVersion,
    logger,
    components: [],

    async init(): Promise<void> {
      try {
        this.logger.info(`Initializing module ${this.name} v${this.version}`);
        
        // Initialize components
        for (const component of this.components) {
          await component.init();
        }
        
        this.logger.info(`Module ${this.name} initialized successfully`);
      } catch (error: any) {
        this.logger.error(`Failed to initialize module ${this.name}`, { error: error.message });
        throw error;
      }
    },

    async destroy(): Promise<void> {
      try {
        this.logger.info(`Destroying module ${this.name}`);
        
        // Destroy components
        for (const component of this.components) {
          await component.destroy();
        }
        
        this.logger.info(`Module ${this.name} destroyed successfully`);
      } catch (error: any) {
        this.logger.error(`Failed to destroy module ${this.name}`, { error: error.message });
        throw error;
      }
    }
  };

  return module;
} 