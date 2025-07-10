import { LoggerService } from '../logger/LoggerService';
import { ConfigService } from '../services/ConfigService';
import { DatabaseService } from '../services/DatabaseService';

export interface RocketApp {
  name: string;
  version: string;
  logger: LoggerService;
  config: ConfigService;
  database?: DatabaseService;
  modules: RocketModule[];
  components: RocketComponent[];
  start(): Promise<void>;
  stop(): Promise<void>;
}

export interface RocketModule {
  name: string;
  version: string;
  logger: LoggerService;
  components: RocketComponent[];
  init(): Promise<void>;
  destroy(): Promise<void>;
}

export interface RocketComponent {
  name: string;
  type: 'page' | 'component' | 'service' | 'utility';
  logger: LoggerService;
  init(): Promise<void>;
  destroy(): Promise<void>;
}

export interface AppOptions {
  name?: string;
  version?: string;
  logLevel?: string;
  enableDatabase?: boolean;
  modules?: string[];
}

export interface ModuleOptions {
  name: string;
  version?: string;
  components?: string[];
}

export interface ComponentOptions {
  name: string;
  type: 'page' | 'component' | 'service' | 'utility';
  template?: string;
} 