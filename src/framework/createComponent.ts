import { LoggerService } from '../logger/LoggerService';
import { RocketComponent, ComponentOptions } from './types';

export function createComponent(options: ComponentOptions): RocketComponent {
  const componentName = options.name;
  const componentType = options.type;
  
  const logger = new LoggerService({ 
    module: componentName 
  });

  const component: RocketComponent = {
    name: componentName,
    type: componentType,
    logger,

    async init(): Promise<void> {
      try {
        this.logger.info(`Initializing ${this.type} ${this.name}`);
        
        // Component-specific initialization logic would go here
        // For now, we'll just log the initialization
        
        this.logger.info(`${this.type} ${this.name} initialized successfully`);
      } catch (error: any) {
        this.logger.error(`Failed to initialize ${this.type} ${this.name}`, { error: error.message });
        throw error;
      }
    },

    async destroy(): Promise<void> {
      try {
        this.logger.info(`Destroying ${this.type} ${this.name}`);
        
        // Component-specific cleanup logic would go here
        // For now, we'll just log the destruction
        
        this.logger.info(`${this.type} ${this.name} destroyed successfully`);
      } catch (error: any) {
        this.logger.error(`Failed to destroy ${this.type} ${this.name}`, { error: error.message });
        throw error;
      }
    }
  };

  return component;
} 