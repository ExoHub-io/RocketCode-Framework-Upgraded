import { LoggerService } from '../logger/LoggerService';
import dotenv from 'dotenv';

export interface EnvConfig {
  [key: string]: string | number | boolean | undefined;
}

export class EnvService {
  private logger: LoggerService;
  private config: EnvConfig = {};

  constructor(logger?: LoggerService) {
    this.logger = logger || new LoggerService({ module: 'EnvService' });
    this.loadEnvironment();
  }

  private loadEnvironment(): void {
    try {
      // Load .env file if it exists
      dotenv.config();
      
      this.logger.debug('Environment variables loaded successfully');
    } catch (error: any) {
      this.logger.warn('Failed to load .env file', { error: error.message });
    }
  }

  get(key: string, defaultValue?: any): string | undefined {
    const value = process.env[key] || this.config[key];
    
    if (value === undefined && defaultValue !== undefined) {
      this.logger.debug(`Environment variable ${key} not found, using default value`, { key, defaultValue });
      return defaultValue;
    }

    if (value === undefined) {
      this.logger.warn(`Environment variable ${key} not found`, { key });
    }

    return value;
  }

  getNumber(key: string, defaultValue?: number): number | undefined {
    const value = this.get(key);
    
    if (value === undefined) {
      return defaultValue;
    }

    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      this.logger.error(`Environment variable ${key} is not a valid number`, { key, value });
      return defaultValue;
    }

    return numValue;
  }

  getBoolean(key: string, defaultValue?: boolean): boolean | undefined {
    const value = this.get(key);
    
    if (value === undefined) {
      return defaultValue;
    }

    const lowerValue = value.toLowerCase();
    
    if (lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes') {
      return true;
    }
    
    if (lowerValue === 'false' || lowerValue === '0' || lowerValue === 'no') {
      return false;
    }

    this.logger.error(`Environment variable ${key} is not a valid boolean`, { key, value });
    return defaultValue;
  }

  set(key: string, value: string | number | boolean): void {
    this.config[key] = value;
    this.logger.debug(`Environment variable ${key} set`, { key, value });
  }

  has(key: string): boolean {
    return process.env[key] !== undefined || this.config[key] !== undefined;
  }

  getAll(): EnvConfig {
    return { ...process.env, ...this.config };
  }

  // Convenience methods for common environment variables
  getNodeEnv(): string {
    return this.get('NODE_ENV', 'development') || 'development';
  }

  isDevelopment(): boolean {
    return this.getNodeEnv() === 'development';
  }

  isProduction(): boolean {
    return this.getNodeEnv() === 'production';
  }

  isTest(): boolean {
    return this.getNodeEnv() === 'test';
  }

  getPort(): number {
    return this.getNumber('PORT', 3000) || 3000;
  }

  getDatabaseUrl(): string | undefined {
    return this.get('DATABASE_URL');
  }

  getJwtSecret(): string | undefined {
    return this.get('JWT_SECRET');
  }

  validateRequired(keys: string[]): void {
    const missing: string[] = [];
    
    keys.forEach(key => {
      if (!this.has(key)) {
        missing.push(key);
      }
    });

    if (missing.length > 0) {
      const error = `Missing required environment variables: ${missing.join(', ')}`;
      this.logger.error(error, { missing });
      throw new Error(error);
    }
  }
} 